# immobenin_backend/authentication/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser # <-- Correct : importe CustomUser de authentication.models

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    # Permet à Django de savoir que c'est l'admin pour CustomUser
    model = CustomUser

    # Ajoute 'profile_picture' et 'firebase_uid' aux champs affichés dans l'admin
    fieldsets = UserAdmin.fieldsets + (
        (('Informations de Profil Supplémentaires'), {'fields': ('profile_picture', 'firebase_uid')}), # <-- AJOUTEZ 'firebase_uid' ICI
    )
    # Ajoute 'profile_picture' et 'firebase_uid' à la liste des colonnes affichées
    list_display = UserAdmin.list_display + ('profile_picture', 'firebase_uid',) # <-- AJOUTEZ 'firebase_uid' ICI

