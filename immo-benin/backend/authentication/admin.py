# immobenin_backend/authentication/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser # <-- Correct : importe CustomUser de authentication.models

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    fieldsets = UserAdmin.fieldsets + (
        (('Informations de Profil Supplémentaires'), {'fields': ('profile_picture', 'firebase_uid', 'pseudo', 'gender', 'language', 'country', 'phone_number')}),
    )
    list_display = UserAdmin.list_display + ('profile_picture', 'firebase_uid', 'pseudo', 'country', 'phone_number')
    list_filter = UserAdmin.list_filter + ('country', 'gender', 'language')
    search_fields = UserAdmin.search_fields + ('pseudo', 'phone_number')

