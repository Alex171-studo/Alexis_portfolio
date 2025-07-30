# immobenin_backend/authentication/urls.py
from django.urls import path
from .views import FirebaseLoginView

urlpatterns = [
    path('firebase-login/', FirebaseLoginView.as_view(), name='firebase_login'),
]