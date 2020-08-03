from django.db import models

class Movie(models.Model):
    tmdb_id = models.IntegerField()
    title = models.CharField(max_length=100)
    summary = models.TextField()

    def __str__(self):
        return self.title

