# backend/authentification/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractUser):
    """
    Modèle d'utilisateur personnalisé qui étend AbstractUser de Django
    pour ajouter des champs supplémentaires comme une photo de profil et l'UID Firebase.
    """
    GENDER_CHOICES = [
        ('M', _('Masculin')),
        ('F', _('Féminin')),
        ('O', _('Autre')),
    ]

    profile_picture = models.ImageField(
        _("Photo de profil"),
        upload_to='profile_pictures/',
        blank=True,
        null=True
    )
    firebase_uid = models.CharField(
        max_length=128,
        unique=True,
        blank=True,
        null=True,
        verbose_name="UID Firebase"
    )
    pseudo = models.CharField(max_length=150, blank=True, verbose_name=_("Pseudo"))
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, verbose_name=_("Genre"))
    language = models.CharField(max_length=10, default='fr', verbose_name=_("Langue"))
    country = models.CharField(max_length=100, blank=True, verbose_name=_("Pays"))
    phone_number = models.CharField(max_length=20, blank=True, verbose_name=_("Numéro de téléphone"))

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

