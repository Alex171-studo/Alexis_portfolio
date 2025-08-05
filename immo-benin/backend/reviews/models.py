from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from properties.models import Property

User = get_user_model()

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(_("Note"))
    comment = models.TextField(_("Commentaire"))
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Avis")
        verbose_name_plural = _("Avis")
        ordering = ['-created_at']

    def __str__(self):
        return f'Review by {self.user} for {self.property.title}'