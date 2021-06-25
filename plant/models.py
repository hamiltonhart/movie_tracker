from django.db import models


class Plant(models.Model):
    name = models.CharField(max_length=100)
    sci_name = models.CharField(max_length=100, default="")
    type = models.CharField(max_length=100)
    watering_instructions = models.TextField(default="")
    comments = models.TextField(default="")

    def __str__(self):
        return self.name
