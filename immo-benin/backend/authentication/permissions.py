# backend/authentication/permissions.py

from rest_framework import permissions

class IsAgentOrAdminOrReadOnly(permissions.BasePermission):
    """
    Permission personnalisée pour autoriser uniquement les propriétaires d'un objet
    ou les administrateurs à le modifier.
    Les autres utilisateurs ont un accès en lecture seule.
    """

    def has_object_permission(self, request, view, obj):
        # Les requêtes en lecture (GET, HEAD, OPTIONS) sont autorisées pour tout le monde.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Les permissions d'écriture sont uniquement accordées à l'agent propriétaire de la propriété
        # ou à un utilisateur administrateur.
        # Nous vérifions si l'objet a un attribut 'agent' avant de comparer.
        if hasattr(obj, 'agent'):
            return obj.agent == request.user or request.user.is_staff
        
        # Si l'objet n'a pas d'attribut 'agent' (par exemple, un profil utilisateur),
        # nous pourrions vouloir une logique différente. Pour l'instant, nous laissons passer
        # en supposant que d'autres permissions gèrent ce cas.
        # Dans notre cas, cette permission est pour les propriétés, donc 'agent' existera.
        return False
