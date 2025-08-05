# immobenin_backend/properties/urls.py

from django.urls import path
from .views import (
    PropertyListCreateView,
    PropertyDetailView,
    PropertyImageView,
    MyListingsView,
    upload_multiple_images,
    PendingPropertiesView,
    UpdatePropertyStatusView,
)

urlpatterns = [
    # Pour /api/properties/
    path('', PropertyListCreateView.as_view(), name='property-list-create'),

    # Pour /api/properties/<int:pk>/
    path('<int:pk>/', PropertyDetailView.as_view(), name='property-detail'),

    # Pour /api/properties/upload-image/
    path('upload-image/', PropertyImageView.as_view(), name='property-image-upload'),

    # Pour /api/properties/upload-images/
    path('upload-images/', upload_multiple_images, name='property-images-upload-multiple'),

    # Pour /api/properties/my-listings/
    path('my-listings/', MyListingsView.as_view(), name='my-listings'),

    # Pour /api/properties/pending/
    path('pending/', PendingPropertiesView.as_view(), name='pending-properties'),

    # Pour /api/properties/<int:pk>/update-status/
    path('<int:pk>/update-status/', UpdatePropertyStatusView.as_view(), name='update-property-status'),
]
