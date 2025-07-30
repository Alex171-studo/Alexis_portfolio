# immobenin_backend/authentication/firebase_utils.py
import firebase_admin
from firebase_admin import credentials, auth
from django.conf import settings
import os

def initialize_firebase_admin():
    """Initialise le SDK Firebase Admin une seule fois."""
    if not firebase_admin._apps:
        cred_path = settings.FIREBASE_SERVICE_ACCOUNT_KEY_PATH
        if not os.path.exists(cred_path):
            raise FileNotFoundError(f"Clé de service Firebase non trouvée à : {cred_path}. Veuillez la télécharger depuis la console Firebase (Paramètres du projet > Comptes de service) et la placer à la racine de votre projet Django.")

        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        print("Firebase Admin SDK initialisé avec succès.")
    else:
        print("Firebase Admin SDK déjà initialisé.")