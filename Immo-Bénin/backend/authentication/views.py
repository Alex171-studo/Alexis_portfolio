# immobenin_backend/authentication/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

from .firebase_utils import initialize_firebase_admin
from firebase_admin import auth as firebase_auth
import logging

logger = logging.getLogger(__name__)
User = get_user_model()

# Initialiser Firebase une fois au démarrage (ou lors de la première utilisation de la vue)
initialize_firebase_admin()

class FirebaseLoginView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        uid = request.data.get('uid')
        email = request.data.get('email')
        display_name = request.data.get('displayName', '').strip() # .strip() pour nettoyer les espaces

        if not uid or not email:
            return Response(
                {'error': 'UID et email sont requis.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Vérification Firebase (gardée telle quelle)
            firebase_user = firebase_auth.get_user(uid)
            if firebase_user.email != email:
                return Response({"error": "L'email ne correspond pas à l'UID Firebase."}, status=status.HTTP_400_BAD_REQUEST)

            user, created = User.objects.get_or_create(email=email)

            user_needs_save = False

            if created:
                user.username = email # Toujours définir l'username par défaut
                user.set_unusable_password() # Empêche la connexion par mot de passe si c'est une création Firebase
                user_needs_save = True # Marque pour sauvegarde
                logger.info(f"Utilisateur Django créé pour Firebase UID: {uid}, Email: {email}")
            else:
                logger.info(f"Utilisateur Django existant trouvé pour Firebase UID: {uid}, Email: {email}")

            # Logique pour définir/mettre à jour le nom
            # Nous voulons que first_name reflète displayName si disponible
            if display_name and user.first_name != display_name:
                name_parts = display_name.split(' ', 1)
                user.first_name = name_parts[0]
                # Si displayName contient un espace, le reste va dans last_name
                if len(name_parts) > 1:
                    user.last_name = name_parts[1]
                else:
                    # Si pas de last_name dans displayName, assurez-vous qu'il est vide
                    user.last_name = '' 
                user_needs_save = True # Marque pour sauvegarde si le nom a changé

            # Sauvegarder l'utilisateur si des modifications ont été apportées
            if user_needs_save:
                user.save()

            # Obtenir ou créer un token d'authentification pour cet utilisateur Django
            token, _ = Token.objects.get_or_create(user=user)

            return Response({
                'token': token.key,
                'user_id': user.id,
                'email': user.email,
                'displayName': user.get_full_name() or user.email, # Renvoyer le nom complet ou l'email
                'uid': uid # C'est une bonne pratique de renvoyer l'UID également
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Erreur lors de la connexion Firebase: {e}", exc_info=True)
            return Response(
                {'error': 'Erreur interne du serveur lors de la liaison du compte.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )