from django.db import models
from django.contrib.auth import get_user_model
import datetime


class MovieCollection(models.Model):
    title = models.CharField(max_length=100)
    created_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    created_date = models.DateField(default=datetime.date.today())

    def __str__(self):
        return self.title
