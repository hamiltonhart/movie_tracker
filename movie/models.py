from django.db import models

class Movie(models.Model):
    tmbd_id = models.IntegerField()
    title = models.CharField(max_length=100)
    summary = models.TextField()

    def __str__(self):
        return self.title

