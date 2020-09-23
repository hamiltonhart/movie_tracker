import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from .models import Movie


# Queries

class MovieType(DjangoObjectType):
    class Meta:
        model = Movie


class Query(graphene.ObjectType):
    movies = graphene.List(MovieType)
    movie = graphene.Field(MovieType, id=graphene.Int(required=True))

    def resolve_movies(self, info):
        return Movie.objects.all()

    def resolve_movie(self, info, id):
        try:
            return Movie.objects.get(id=id)
        except:
            return GraphQLError("A valid Movie ID was not provided.")


# Mutations

class CreateMovie(graphene.Mutation):
    movie = graphene.Field(MovieType)

    class Arguments:
        tmdb_id = graphene.Int()
        title = graphene.String(required=True)
        summary = graphene.String()
        imdb_id = graphene.String()
        release_year = graphene.Int()

    # The @login_required decorator does just what it says, requires a user to be logged in before they can execute the mutation. Can also be added to Queries if desired.
    @login_required
    def mutate(self, info, title, tmdb_id=None, summary=None, imdb_id=None, release_year=None):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError("Login to create a Movie.")
        movie = Movie(title=title)
        if tmdb_id:
            movie.tmdb_id = tmdb_id
        if summary:
            movie.summary = summary
        if imdb_id:
            movie.imdb_id = imdb_id
        if release_year:
            movie.release = release_year
        movie.save()
        return CreateMovie(movie=movie)


class UpdateMovie(graphene.Mutation):
    movie = graphene.Field(MovieType)

    class Arguments:
        id = graphene.Int(required=True)
        title = graphene.String(required=True)
        tmdb_id = graphene.String(required=True)
        summary = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id, tmdb_id, title, summary):
        try:
            movie = Movie.objects.get(id=id)
        except:
            raise GraphQLError("A valid Movie ID was not provided.")

        if title:
            movie.title = title
        if tmdb_id:
            movie.tmdb_id = tmdb_id
        if summary:
            movie.summary = summary

        movie.save()
        return UpdateMovie(movie=movie)


class DeleteMovie(graphene.Mutation):
    id = graphene.Int()

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        try:
            movie = Movie.objects.get(id=id)
        except:
            raise GraphQLError("A valid Movie ID was not provided.")

        movie.delete()
        return DeleteMovie(id=id)


class Mutation(graphene.ObjectType):
    create_movie = CreateMovie.Field()
    update_movie = UpdateMovie.Field()
    delete_movie = DeleteMovie.Field()
