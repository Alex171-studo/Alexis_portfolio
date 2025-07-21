# immobenin_backend/authentication/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    # Permet à Django de savoir que c'est l'admin pour CustomUser
    model = CustomUser

    # Ajoute 'profile_picture' aux champs affichés dans l'admin
    # Vous pouvez le mettre dans un nouveau fieldset ou dans un existant
    fieldsets = UserAdmin.fieldsets + (
        (('Informations de Profil Supplémentaires'), {'fields': ('profile_picture',)}),
    )
    # Ajoute 'profile_picture' à la liste des colonnes affichées dans la liste des utilisateurs
    list_display = UserAdmin.list_display + ('profile_picture',)