# backend/authentification/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractUser):
    """
    Modèle d'utilisateur personnalisé qui étend AbstractUser de Django
    pour ajouter des champs supplémentaires comme une photo de profil.
    """
    profile_picture = models.ImageField(
        _("Photo de profil"),
        upload_to='profile_pictures/', # Les images seront stockées dans MEDIA_ROOT/profile_pictures/
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = _("Utilisateur Personnalisé")
        verbose_name_plural = _("Utilisateurs Personnalisés")

    def __str__(self):
        return self.email or self.username

    def get_full_name(self):
        """
        Retourne le prénom + nom, ou l'email si l'un des deux manque.
        Utilisé par le serializer pour afficher le nom complet de l'agent.
        """
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        elif self.first_name:
            return self.first_name
        elif self.last_name:
            return self.last_name
        return self.email
