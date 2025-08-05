from django.urls import path
from .views import BoostPropertyView

urlpatterns = [
    path('properties/<int:pk>/boost/', BoostPropertyView.as_view(), name='boost-property'),
]
