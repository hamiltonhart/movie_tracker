from django.db import models
from plant.models import Plant
from image.models import Image


class PlantItem(models.Model):
    plant = models.ForeignKey(
        Plant, on_delete=models.CASCADE, related_name="plants")
    location = models.CharField(max_length=200, default=None)
    wish_list = models.BooleanField(default=False)
    image = models.ForeignKey(Image, on_delete=models.CASCADE)

    def __str__(self):
        return self.plant.name
