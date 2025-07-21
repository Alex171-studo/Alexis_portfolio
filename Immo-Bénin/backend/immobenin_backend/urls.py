# immobenin_backend/immobenin_backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings # <--- AJOUTEZ CETTE LIGNE !
from django.conf.urls.static import static # <--- AJOUTEZ CETTE LIGNE !

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('authentication.urls')),
    path('api/', include('properties.urls')),
    # Ajoutez ici d'autres URLs pour vos futures APIs (logements, paiements, etc.)
]

# Seulement en mode développement, servez les fichiers médias
if settings.DEBUG: # <--- AJOUTEZ TOUT CE BLOC !
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)