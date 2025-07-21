# immobenin_backend/properties/urls.py
from django.urls import path
from .views import (
    PropertyListCreateView,
    PropertyDetailView,
    PropertyImageView,
    MyListingsView,
    upload_multiple_images,  # 👈 importer la nouvelle vue
)

urlpatterns = [
    path('properties/', PropertyListCreateView.as_view(), name='property-list-create'),
    path('properties/<int:pk>/', PropertyDetailView.as_view(), name='property-detail'),

    # 🟩 ancienne route (upload une image à la fois)
    path('properties/upload-image/', PropertyImageView.as_view(), name='property-image-upload'),

    # 🟩 nouvelle route (upload plusieurs images d’un coup)
    path('properties/upload-images/', upload_multiple_images, name='property-images-upload-multiple'),

    path('properties/my-listings/', MyListingsView.as_view(), name='my-listings'),
]
