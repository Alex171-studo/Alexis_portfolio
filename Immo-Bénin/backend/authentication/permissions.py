# immobenin_backend/authentification/permissions.py
from rest_framework import permissions

class IsOwnerOfProperty(permissions.BasePermission):
    """
    Permission personnalisée pour n'autoriser les propriétaires de l'objet (utilisateurs) qu'à le modifier ou le supprimer.
    """
    def has_object_permission(self, request, view, obj):
        # Les permissions de lecture sont autorisées pour toutes les requêtes GET, HEAD, OPTIONS.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Les permissions d'écriture (PUT, PATCH, DELETE) ne sont autorisées que si l'utilisateur est le propriétaire.
        # obj.agent fait référence à l'instance de CustomUser directement.
        return obj.agent == request.user