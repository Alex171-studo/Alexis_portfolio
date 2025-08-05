from rest_framework import permissions
from django.conf import settings

class IsAdminOrApiKey(permissions.BasePermission):
    """
    Permission personnalisée pour vérifier si l'utilisateur est un admin Django
    OU si la clé API d'admin est fournie.
    """
    def has_permission(self, request, view):
        # Vérifie si la clé API d'admin est présente et correcte
        admin_api_key = request.headers.get('X-Admin-API-Key')
        if admin_api_key and admin_api_key == settings.ADMIN_API_KEY:
            return True
            
        # Sinon, vérifie si l'utilisateur est un admin Django
        return request.user and request.user.is_staff

class IsAgentOrAdminOrReadOnly(permissions.BasePermission):
    """
    Permission personnalisée pour autoriser tout le monde à lire (GET),
    mais seules les agents propriétaires ou les admins peuvent modifier ou supprimer.
    """

    def has_permission(self, request, view):
        # Lecture : tout le monde peut accéder
        if request.method in permissions.SAFE_METHODS:
            return True
        # Écriture : uniquement si l'utilisateur est authentifié (vérif obj plus tard)
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Lecture : autorisée pour tous
        if request.method in permissions.SAFE_METHODS:
            return True

        # Écriture : seulement agent propriétaire ou admin
        return hasattr(obj, 'agent') and (obj.agent == request.user or request.user.is_staff)