from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from properties.models import Property
from datetime import datetime, timedelta

class BoostPropertyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        property = get_object_or_404(Property, pk=pk)

        # Simulate payment processing here
        # In a real application, you would integrate with a payment gateway like Stripe

        property.boosted_until = datetime.now() + timedelta(days=7)
        property.save()

        return Response({'message': 'Property boosted successfully'}, status=status.HTTP_200_OK)