from rest_framework import permissions

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
