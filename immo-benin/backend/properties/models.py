# immobenin_backend/properties/models.py

from django.db import models
from django.contrib.auth import get_user_model 
import os
import uuid

User = get_user_model() 

def property_image_upload_path(instance, filename):
    """
    Génère un chemin de fichier unique pour les images de propriété.
    Format: 'property_images/<uuid>/<original_filename>'
    """
  
    ext = filename.split('.')[-1]
   
    filename_unique = f"{uuid.uuid4().hex}.{ext}"
    
    return os.path.join('property_images', filename_unique)


class Property(models.Model):
    
    LISTING_TYPE_CHOICES = [
        ('Vente', 'Vente'),
        ('Location', 'Location'),
    ]
    PROPERTY_TYPE_CHOICES = [
        ('Maison', 'Maison'),
        ('Appartement', 'Appartement'),
        ('Terrain', 'Terrain'),
    ]
    STATUS_CHOICES = [
        ('pending', 'En attente'),
        ('approved', 'Approuvée'),
        ('rejected', 'Rejetée'),
    ]

    title = models.CharField(max_length=255, verbose_name="Titre de l'annonce")
    description = models.TextField(verbose_name="Description détaillée")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Prix")
    currency = models.CharField(max_length=10, default='XOF', verbose_name="Devise")
    listing_type = models.CharField(max_length=10, choices=LISTING_TYPE_CHOICES, default='Vente', verbose_name="Type d'annonce")
    property_type = models.CharField(max_length=50, choices=PROPERTY_TYPE_CHOICES, verbose_name="Type de propriété")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name="Statut de validation")

    # Localisation
    address = models.CharField(max_length=255, verbose_name="Adresse")
    city = models.CharField(max_length=100, verbose_name="Ville")
    district = models.CharField(max_length=100, blank=True, null=True, verbose_name="Quartier/Arrondissement")
    country = models.CharField(max_length=100, default='Bénin', verbose_name="Pays")
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True, verbose_name="Latitude")
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True, verbose_name="Longitude")

    # Caractéristiques physiques
    bedrooms = models.IntegerField(blank=True, null=True, verbose_name="Nombre de chambres")
    bathrooms = models.IntegerField(blank=True, null=True, verbose_name="Nombre de salles de bain")
    area = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, verbose_name="Superficie (m²)")
    is_furnished = models.BooleanField(default=False, verbose_name="Meublé")
    
    has_garden = models.BooleanField(default=False, verbose_name="Dispose d'un jardin")
    has_parking = models.BooleanField(default=False, verbose_name="Dispose d'un parking")
    has_balcony = models.BooleanField(default=False, verbose_name="Dispose d'un balcon")
    has_pool = models.BooleanField(default=False, verbose_name="Dispose d'une piscine")
    has_air_conditioning = models.BooleanField(default=False, verbose_name="Dispose de la climatisation")
 
    # Autres informations
    agent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties', verbose_name="Agent immobilier")
    is_featured = models.BooleanField(default=False, verbose_name="Mise en avant")
    boosted_until = models.DateTimeField(blank=True, null=True, verbose_name="Boosté jusqu'au")

    # Horodatage
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Propriété"
        verbose_name_plural = "Propriétés"
        ordering = ['-created_at'] 

    def __str__(self):
        return f"{self.title} ({self.city})"

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    
    image = models.ImageField(upload_to=property_image_upload_path, verbose_name="Image")
    is_main = models.BooleanField(default=False, verbose_name="Image principale")

    class Meta:
        verbose_name = "Image de Propriété"
        verbose_name_plural = "Images de Propriété"

    def __str__(self):
        return f"Image for {self.property.title}"
