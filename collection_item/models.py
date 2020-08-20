from django.db import models
from datetime import date

from movie_collections.models import MovieCollection
from movie.models import Movie


class CollectionItem(models.Model):
    movie_collection = models.ForeignKey(
        MovieCollection, on_delete=models.CASCADE, related_name="movies")
    movie = models.ForeignKey(
        Movie, on_delete=models.CASCADE, related_name="movie_collection")
    date = models.DateField(default=date.today())
    comments = models.TextField(null=True)
    rating = models.IntegerField(null=True)

    class Meta:
        ordering = ['movie__title']

    def __str__(self):
        return self.movie.title
