# immobenin_backend/immobenin_backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from properties.views import PropertyStatsView, DashboardStatsView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/', include('authentication.urls')), 
    path('api/properties/', include('properties.urls')),
    path('api/stats/property-trends/', PropertyStatsView.as_view(), name='property-stats'),
    path('api/stats/dashboard/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('api/', include('immo_favorites.urls')),
    path('api/', include('reviews.urls')),
    path('api/', include('payments.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)