from movie.models import Movie


def find_prefix(Movie):
    for movie in Movie.objects.all():
        movie.save(title_updated=True)


find_prefix(Movie)
