# backend/properties/serializers.py

from rest_framework import serializers
from .models import Property, PropertyImage
from authentication.models import CustomUser
from authentication.serializers import CustomUserSerializer

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['image', 'is_main']


class PropertySerializer(serializers.ModelSerializer):
 
    agent = CustomUserSerializer(read_only=True)
    agent_name = serializers.CharField(source='agent.get_full_name', read_only=True)
    agent_email = serializers.SerializerMethodField()
    agent_profile_picture_url = serializers.SerializerMethodField()

    images = PropertyImageSerializer(many=True, read_only=True)

    
    status_display = serializers.SerializerMethodField()
    property_type_display = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = [
            'id',
            'title',
            'description',
            'price',
            'currency',
            'property_type',
            'property_type_display', 
            'status',
            'status_display',        
            'address',
            'city',
            'district',
            'country',
            'latitude',
            'longitude',
            'bedrooms',
            'bathrooms',
            'area',
            'agent',
            'agent_name',
            'agent_email',
            'agent_profile_picture_url',
            'is_featured',
            'created_at',
            'updated_at',
            'has_garden',
            'has_parking',
            'has_balcony',
            'has_pool',
            'has_air_conditioning',
            'images'
        ]
        read_only_fields = ['agent']

    def get_agent_email(self, obj):
        if obj.agent and obj.agent.email:
            return obj.agent.email
        return None

    def get_agent_profile_picture_url(self, obj):
        # Récupère l'objet 'request' depuis le contexte du serializer
        request = self.context.get('request') 
        
        # Vérifie si 'request' existe ET si l'agent et sa photo de profil existent
        if request and obj.agent and obj.agent.profile_picture:
            # Si tout est là, construit et retourne l'URL absolue
            return request.build_absolute_uri(obj.agent.profile_picture.url)
        
        # Sinon, retourne None (ou une URL par défaut si vous en aviez une)
        return None

    def get_status_display(self, obj):
        return obj.get_status_display()

    def get_property_type_display(self, obj):
        return obj.get_property_type_display()