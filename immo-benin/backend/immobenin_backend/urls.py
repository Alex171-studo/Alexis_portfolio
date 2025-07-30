

# immobenin_backend/immobenin_backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # --- MODIFIEZ CETTE LIGNE COMME SUIT ---
    # L'inclusion de 'authentication.urls' se fera directement sous '/api/'
    path('api/', include('authentication.urls')), 
    
    # Vos autres includes qui sont déjà corrects
    path('api/properties/', include('properties.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)