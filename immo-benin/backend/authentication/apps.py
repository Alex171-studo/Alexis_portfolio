from django.apps import AppConfig
from django.conf import settings
import firebase_admin
from firebase_admin import credentials
import os

class AuthenticationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'authentication'

    def ready(self):
        if not firebase_admin._apps:
            try:
                cred = credentials.Certificate(settings.FIREBASE_SERVICE_ACCOUNT_KEY_PATH)
                firebase_admin.initialize_app(cred)
                print("SDK Firebase Admin initialisé avec succès.")
            except Exception as e:
                print(f"ERREUR lors de l'initialisation de Firebase Admin SDK: {e}")