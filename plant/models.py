from django.db import models
from plant_type.models import PlantType


class Plant(models.Model):
    name = models.CharField(max_length=100, unique=True)
    sci_name = models.CharField(max_length=100, default="")
    types = models.ManyToManyField(PlantType)
    watering_instructions = models.TextField(default="")
    comments = models.TextField(default="")

    def __str__(self):
        return self.name
