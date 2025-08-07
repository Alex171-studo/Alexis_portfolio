# immobenin_backend/authentication/urls.py
from django.urls import path
from .views import FirebaseLoginView, UserListView, MakeAdminView, RevokeAdminView, DeleteUserView, AdminLoginView, UserProfileView

urlpatterns = [
    path('firebase-login/', FirebaseLoginView.as_view(), name='firebase_login'),
    path('admin-login/', AdminLoginView.as_view(), name='admin_login'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/make-admin/', MakeAdminView.as_view(), name='make-admin'),
    path('users/<int:pk>/revoke-admin/', RevokeAdminView.as_view(), name='revoke-admin'),
    path('users/<int:pk>/delete/', DeleteUserView.as_view(), name='delete-user'),
]