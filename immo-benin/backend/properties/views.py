# immobenin_backend/properties/views.py
from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Property, PropertyImage
from .serializers import PropertySerializer, PropertyImageSerializer
from authentication.permissions import IsAgentOrAdminOrReadOnly, IsAdminOrApiKey
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from django.db.models.functions import TruncMonth
from django.db.models import Count, Q
from django.utils import timezone
from authentication.models import CustomUser
from datetime import timedelta


class PropertyListCreateView(generics.ListCreateAPIView):
    serializer_class = PropertySerializer

    def get_permissions(self):
        """
        Instancie et retourne la liste des permissions que cette vue requiert.
        """
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        queryset = Property.objects.filter(status='approved')
        listing_type = self.request.query_params.get('listing_type')
        property_type = self.request.query_params.get('property_type')
        city = self.request.query_params.get('city')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')

        if listing_type:
            queryset = queryset.filter(listing_type=listing_type)
        if property_type:
            queryset = queryset.filter(property_type=property_type)
        if city:
            queryset = queryset.filter(city__iexact=city)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        return queryset

    def perform_create(self, serializer):
        serializer.save(agent=self.request.user)


class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAgentOrAdminOrReadOnly]


class PropertyImageView(generics.CreateAPIView):
    
    queryset = PropertyImage.objects.all()
    serializer_class = PropertyImageSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        property_id = self.request.data.get('property')
        property_instance = get_object_or_404(Property, id=property_id)

        is_main_raw = self.request.data.get('is_main', 'false')
        is_main_image = str(is_main_raw).lower() in ['true', '1', 'yes']

        if is_main_image:
            PropertyImage.objects.filter(property=property_instance).update(is_main=False)

        serializer.save(property=property_instance, is_main=is_main_image)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_multiple_images(request):
    
    property_id = request.data.get('property')
    main_index = int(request.data.get('main_index', 0))
    images = request.FILES.getlist('images')  

    if not property_id or not images:
        return Response({'error': 'Champ "property" ou images manquant.'}, status=400)

    property_instance = get_object_or_404(Property, id=property_id)

    
    PropertyImage.objects.filter(property=property_instance).update(is_main=False)

    for idx, image in enumerate(images):
        PropertyImage.objects.create(
            property=property_instance,
            image=image,
            is_main=(idx == main_index)
        )

    return Response({'message': f'{len(images)} image(s) ajoutée(s).'}, status=201)


class PendingPropertiesView(generics.ListAPIView):
    serializer_class = PropertySerializer
    permission_classes = [IsAdminOrApiKey]

    def get_queryset(self):
        return Property.objects.filter(status='pending')

class UpdatePropertyStatusView(APIView):
    permission_classes = [IsAdminOrApiKey]

    def patch(self, request, pk):
        property = get_object_or_404(Property, pk=pk)
        status = request.data.get('status')
        if status not in ['approved', 'rejected']:
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
        property.status = status
        property.save()
        serializer = PropertySerializer(property)
        return Response(serializer.data)


class MyListingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        properties = Property.objects.filter(agent=user)
        serializer = PropertySerializer(properties, many=True, context={'request': request})
        return Response(serializer.data)


class PropertyDeleteView(generics.DestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticated, IsAgentOrAdminOrReadOnly]

    def perform_destroy(self, instance):
        if instance.agent != self.request.user and not self.request.user.is_staff:
            self.permission_denied(self.request)
        instance.delete()

class PropertyStatsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        stats = Property.objects.annotate(month=TruncMonth('created_at')).values('month').annotate(approved=Count('id', filter=Q(status='approved')),
                      rejected=Count('id', filter=Q(status='rejected'))).order_by('month')

        formatted_stats = [{
            "name": stat['month'].strftime('%B %Y'),
            "Approuvé": stat['approved'],
            "Rejeté": stat['rejected']
        } for stat in stats]
        
        return Response(formatted_stats)

class DashboardStatsView(APIView):
    permission_classes = [IsAdminOrApiKey]

    def get(self, request):
        # User stats
        total_users = CustomUser.objects.count()
        new_users_last_7_days = CustomUser.objects.filter(date_joined__gte=timezone.now() - timedelta(days=7)).count()

        # Property stats
        total_properties = Property.objects.count()
        new_properties_last_7_days = Property.objects.filter(created_at__gte=timezone.now() - timedelta(days=7)).count()
        approved_properties = Property.objects.filter(status='approved').count()
        rejected_properties = Property.objects.filter(status='rejected').count()
        pending_properties = Property.objects.filter(status='pending').count()

        # Property trends for the last 30 days
        property_trends = Property.objects.filter(created_at__gte=timezone.now() - timedelta(days=30))             .extra(select={'day': 'date(created_at)'})             .values('day')             .annotate(count=Count('id'))             .order_by('day')

        formatted_property_trends = [{
            "date": trend['day'],
            "properties": trend['count']
        } for trend in property_trends]

        # User trends for the last 30 days
        user_trends = CustomUser.objects.filter(date_joined__gte=timezone.now() - timedelta(days=30))             .extra(select={'day': 'date(date_joined)'})             .values('day')             .annotate(count=Count('id'))             .order_by('day')

        formatted_user_trends = [{
            "date": trend['day'],
            "users": trend['count']
        } for trend in user_trends
                                 ]
        
        # Combine trends by date
        combined_trends = {}
        for trend in formatted_property_trends:
            combined_trends[trend['date']] = {'properties': trend['properties']}
        
        for trend in formatted_user_trends:
            if trend['date'] in combined_trends:
                combined_trends[trend['date']]['users'] = trend['users']
            else:
                combined_trends[trend['date']] = {'users': trend['users']}

        # Fill in missing dates with 0 counts
        date_range = [timezone.now().date() - timedelta(days=i) for i in range(29, -1, -1)]
        final_trends = []
        for date in date_range:
            date_str = date.strftime('%Y-%m-%d')
            data = combined_trends.get(date_str, {})
            final_trends.append({
                'name': date.strftime('%b %d'),
                'Annonces': data.get('properties', 0),
                'Utilisateurs': data.get('users', 0)
            })


        stats = {
            'total_users': total_users,
            'new_users_last_7_days': new_users_last_7_days,
            'total_properties': total_properties,
            'new_properties_last_7_days': new_properties_last_7_days,
            'approved_properties': approved_properties,
            'rejected_properties': rejected_properties,
            'pending_properties': pending_properties,
            'trends': final_trends
        }

        return Response(stats)
