from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    property_count = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = (
            'id', 'email', 'first_name', 'last_name', 'profile_picture', 
            'pseudo', 'gender', 'language', 'country', 'phone_number', 
            'property_count'
        )
        read_only_fields = ('id',)

    def get_property_count(self, obj):
        return obj.properties.count()
