from django.db import models


class Movie(models.Model):
    tmdb_id = models.IntegerField(null=True)
    imdb_id = models.CharField(max_length=50, default="0")
    title = models.CharField(max_length=100)
    title_prefix = models.CharField(max_length=10, null=True)
    release_year = models.IntegerField(default=0, null=True)
    summary = models.TextField(null=True)
    pic_path = models.CharField(max_length=100, null=True)

    def __str__(self):
        if self.title_prefix:
            return f'{self.title_prefix} {self.title}'
        else:
            return self.title

    def save(self, *args, **kwargs):
        if self.title.lower().startswith("the "):
            self.title = self.title[4:]
            self.title_prefix = "The"
        elif self.title.lower().startswith("a "):
            self.title = self.title[2:]
            self.title_prefix = "A"
        super(Movie, self).save(*args, **kwargs)
