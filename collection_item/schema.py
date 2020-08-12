import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from .models import CollectionItem
from movie.models import Movie
from movie_collections.models import MovieCollection

# Queries


class CollectionItemType(DjangoObjectType):
    class Meta:
        model = CollectionItem


class Query(graphene.ObjectType):
    collection_items = graphene.List(CollectionItemType)
    collection_item = graphene.Field(
        CollectionItemType, id=graphene.Int(required=True))

    def resolve_collection_items(self, info):
        return CollectionItem.objects.all()

    def resolve_collection_item(self, info, id):
        try:
            return CollectionItem.objects.get(id=id)
        except:
            return GraphQLError("A valid CollectionItem ID was not provided.")

# Mutations


class CreateCollectionItem(graphene.Mutation):
    collection_item = graphene.Field(CollectionItemType)

    class Arguments:
        movie_collection_id = graphene.Int(required=True)
        tmdb_id = graphene.Int(required=True)
        title = graphene.String(required=True)
        summary = graphene.String(required=True)
        imdb_id = graphene.String()
        release_year = graphene.Int()
        pic_path = graphene.String()
        comments = graphene.String()
        rating = graphene.Int()

    @login_required
    def mutate(self, info, movie_collection_id, tmdb_id, title, summary, imdb_id=None, release_year=None, pic_path=None, comments=None, rating=None):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError("Login to create a Movie Collection Item.")

        try:
            movie_collection = MovieCollection.objects.get(
                id=movie_collection_id)
        except:
            raise GraphQLError(
                f"{movie_collection_id} is not a valid Movie Collection ID")

        try:
            movie = Movie.objects.get(tmdb_id=tmdb_id)
        except:
            if not title:
                raise GraphQLError(
                    "You must provide a title to add a movie to a collection.")
            elif not summary:
                raise GraphQLError(
                    "You must provide a summary to add a movie to a collection.")
            else:
                movie = Movie(
                    tmdb_id=tmdb_id, title=title, summary=summary)
                if pic_path:
                    movie.pic_path = pic_path
                if imdb_id:
                    movie.imdb_id = imdb_id
                if release_year:
                    movie.release = release_year
                movie.save()

        collection_item = CollectionItem(
            movie_collection=movie_collection, movie=movie)
        if comments:
            collection_item.comments = comments
        if rating:
            collection_item.rating = rating
        collection_item.save()
        return CreateCollectionItem(collection_item=collection_item)


class UpdateCollectionItem(graphene.Mutation):
    collection_item = graphene.Field(CollectionItemType)

    class Arguments:
        id = graphene.Int(required=True)
        comments = graphene.String()
        rating = graphene.Int()

    @login_required
    def mutate(self, info, id, comments, rating):
        try:
            collection_item = CollectionItem.objects.get(id=id)
        except:
            raise GraphQLError(
                "A valid Movie Collection Item ID was not provided.")

        if comments:
            collection_item.comments = comments
        if rating:
            collection_item.rating = rating

        collection_item.save()
        return UpdateCollectionItem(collection_item=collection_item)


class DeleteCollectionItem(graphene.Mutation):
    id = graphene.Int()

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        try:
            collection_item = CollectionItem.objects.get(id=id)
        except:
            raise GraphQLError(
                "A valid Movie Collection Item ID was not provided.")

        collection_item.delete()
        return DeleteCollectionItem(id=id)


class Mutation(graphene.ObjectType):
    create_collection_item = CreateCollectionItem.Field()
    update_collection_item = UpdateCollectionItem.Field()
    delete_collection_item = DeleteCollectionItem.Field()
