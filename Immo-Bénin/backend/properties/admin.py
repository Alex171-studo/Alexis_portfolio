# immobenin_backend/properties/admin.py
from django.contrib import admin
from .models import Property, PropertyImage

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = (
        'title', 'property_type', 'price', 'city', 'status', 
        'agent', 'is_featured', 'has_garden', 'has_parking', # AJOUTEZ ICI
        'created_at'
    )
    list_filter = (
        'property_type', 'status', 'city', 'is_featured',
        'has_garden', 'has_parking', 'has_balcony', 'has_pool', 'has_air_conditioning' # AJOUTEZ ICI
    )
    search_fields = ('title', 'description', 'address', 'city', 'district')
    raw_id_fields = ('agent',)
    inlines = [PropertyImageInline]
    date_hierarchy = 'created_at'

    # --- NOUVELLE ORGANISATION AVEC fieldsets pour une meilleure UI ---
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'property_type', 'status', 'price', 'currency', 'is_featured', 'agent')
        }),
        ('Localisation', {
            'fields': ('address', 'city', 'district', 'country', 'latitude', 'longitude')
        }),
        ('Caractéristiques Physiques', {
            'fields': ('bedrooms', 'bathrooms', 'area')
        }),
        ('Commodités', { # NOUVEAU FIELDSET
            'fields': ('has_garden', 'has_parking', 'has_balcony', 'has_pool', 'has_air_conditioning')
        }),
        ('Horodatage', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',), # Pour masquer par défaut
        }),
    )
    readonly_fields = ('created_at', 'updated_at') # Assurez-vous que ces champs ne sont pas modifiables manuellement

@admin.register(PropertyImage)
class PropertyImageAdmin(admin.ModelAdmin):
    list_display = ('property', 'image', 'is_main')
    list_filter = ('is_main',)
    search_fields = ('property__title',)