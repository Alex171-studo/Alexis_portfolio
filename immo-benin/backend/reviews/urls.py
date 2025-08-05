from django.urls import path
from .views import ReviewListCreate

urlpatterns = [
    path('properties/<int:property_id>/reviews/', ReviewListCreate.as_view(), name='review-list-create'),
]
