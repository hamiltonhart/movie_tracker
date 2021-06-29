from django.db import models


class PlantType(models.Model):
    type_label = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.type_label
