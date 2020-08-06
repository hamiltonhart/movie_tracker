import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from .models import MovieCollection

# Queries


class MovieCollectionType(DjangoObjectType):
    class Meta:
        model = MovieCollection


class Query(graphene.ObjectType):
    movie_collections = graphene.List(MovieCollectionType)
    movie_collecion = graphene.Field(
        MovieCollectionType, id=graphene.Int(required=True))

    def resolve_movie_collections(self, info):
        return MovieCollection.objects.all()

    def resolve_movie_collection(self, info, id):
        try:
            return MovieCollection.objects.get(id=id)
        except:
            return GraphQLError("A valid Collection ID was not provided.")


# Mutations


class CreateMovieCollection(graphene.Mutation):
    movie_collection = graphene.Field(MovieCollectionType)

    class Arguments:
        title = graphene.String(required=True)

    @login_required
    def mutate(self, info, title):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError("Login to create a Todo List.")
        movie_collecion = MovieCollection(title=title, created_by=user)
        movie_collecion.save()
        return CreateMovieCollection(movie_collecion=movie_collecion)


class UpdateMovieCollection(graphene.Mutation):
    movie_collecion = graphene.Field(MovieCollectionType)

    class Arguments:
        id = graphene.Int(required=True)
        title = graphene.String(required=True)

    @login_required
    def mutate(self, info, id, title):
        try:
            movie_collecion = MovieCollection.objects.get(id=id)
        except:
            raise GraphQLError("A valid Collection ID was not provided.")

        movie_collecion.title = title

        movie_collecion.save()
        return UpdateMovieCollection(movie_collecion=movie_collecion)


class DeleteMovieCollection(graphene.Mutation):
    id = graphene.Int()

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        try:
            movie_collecion = MovieCollection.objects.get(id=id)
        except:
            raise GraphQLError("A valid Todo List ID was not provided.")

        movie_collecion.delete()
        return DeleteMovieCollection(id=id)


class Mutation(graphene.ObjectType):
    create_movie_collecion = CreateMovieCollection.Field()
    update_movie_collecion = UpdateMovieCollection.Field()
    delete_movie_collecion = DeleteMovieCollection.Field()
