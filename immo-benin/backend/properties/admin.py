from django.contrib import admin
from .models import Property, PropertyImage

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'agent', 'listing_type', 'property_type', 'status', 'price', 'city', 'is_featured', 'boosted_until')
    list_filter = ('listing_type', 'property_type', 'status', 'city', 'is_featured')
    search_fields = ('title', 'description', 'agent__username', 'city', 'address')
    inlines = [PropertyImageInline]
    actions = ['approve_properties', 'reject_properties']

    def approve_properties(self, request, queryset):
        queryset.update(status='approved')
    approve_properties.short_description = "Approuver les propriétés sélectionnées"

    def reject_properties(self, request, queryset):
        queryset.update(status='rejected')
    reject_properties.short_description = "Rejeter les propriétés sélectionnées"

@admin.register(PropertyImage)
class PropertyImageAdmin(admin.ModelAdmin):
    list_display = ('property', 'is_main')
    list_filter = ('is_main',)