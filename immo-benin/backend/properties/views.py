# immobenin_backend/properties/views.py
from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Property, PropertyImage
from .serializers import PropertySerializer, PropertyImageSerializer
from authentication.permissions import IsAgentOrAdminOrReadOnly
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication


class PropertyListCreateView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(agent=self.request.user)


class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PropertyImageView(generics.CreateAPIView):
    """
    Vue pour uploader UNE seule image à la fois (ancienne méthode que tu utilises déjà)
    """
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
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def upload_multiple_images(request):
    """
    Nouvelle vue : upload de plusieurs images d’un coup (plus rapide et plus fiable)
    """
    property_id = request.data.get('property')
    main_index = int(request.data.get('main_index', 0))
    images = request.FILES.getlist('images')  # ⚠️ getlist ici est essentiel

    if not property_id or not images:
        return Response({'error': 'Champ "property" ou images manquant.'}, status=400)

    property_instance = get_object_or_404(Property, id=property_id)

    # Réinitialiser les images principales
    PropertyImage.objects.filter(property=property_instance).update(is_main=False)

    for idx, image in enumerate(images):
        PropertyImage.objects.create(
            property=property_instance,
            image=image,
            is_main=(idx == main_index)
        )

    return Response({'message': f'{len(images)} image(s) ajoutée(s).'}, status=201)


class MyListingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        properties = Property.objects.filter(agent=user)
        serializer = PropertySerializer(properties, many=True, context={'request': request})
        return Response(serializer.data)
