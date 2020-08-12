from django.db import models


class Movie(models.Model):
    tmdb_id = models.IntegerField()
    imdb_id = models.CharField(max_length=50, default="0")
    title = models.CharField(max_length=100)
    release_year = models.IntegerField(default=0)
    summary = models.TextField()
    pic_path = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.title
