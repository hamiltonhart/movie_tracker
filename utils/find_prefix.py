from movie.models import Movie
import datetime

# print(Movie)


def find_prefix(Movie):
    all_movies = Movie.objects.all()
    prefix_the = "The"
    prefix_a = "A"
    for movie in all_movies:
        if movie.title.lower().startswith("the "):
            new_title = movie.title[4:]
            print(f'{prefix_the} {new_title}')
        elif movie.title.lower().startswith("a "):
            new_title = movie.title[2:]
            print(f'{prefix_a} {new_title}')


find_prefix(Movie)
