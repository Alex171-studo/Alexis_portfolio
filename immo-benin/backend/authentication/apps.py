from django.apps import AppConfig
from django.conf import settings
import firebase_admin
from firebase_admin import credentials
import os

class AuthenticationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'authentication'

    def ready(self):
        """
        Initialise le SDK Firebase Admin au démarrage de l'application Django.
        """
        # Vérifie si le SDK a déjà été initialisé pour éviter les erreurs
        if not firebase_admin._apps:
            # Chemin vers le fichier de clé de service Firebase
            cred_path = settings.FIREBASE_SERVICE_ACCOUNT_KEY_PATH
            
            # Vérifie si le fichier de clé existe
            if os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred)
                print("SDK Firebase Admin initialisé avec succès.")
            else:
                print("AVERTISSEMENT: Le fichier de clé de service Firebase n'a pas été trouvé.")
                print(f"Chemin attendu : {cred_path}")
