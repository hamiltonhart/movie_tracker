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
    collection_items = graphene.List(
        CollectionItemType, collection_id=graphene.Int())
    collection_item = graphene.Field(
        CollectionItemType, id=graphene.Int(required=True))

    def resolve_collection_items(self, info, collection_id=None):
        if collection_id:
            return MovieCollection.objects.get(id=collection_id).movies.all()
        else:
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
        tmdb_id = graphene.Int()
        title = graphene.String(required=True)
        summary = graphene.String()
        imdb_id = graphene.String()
        release_year = graphene.Int()
        pic_path = graphene.String()
        comments = graphene.String()
        rating = graphene.Int()

    @login_required
    def mutate(self, info, movie_collection_id, title, tmdb_id=None, summary=None, imdb_id=None, release_year=None, pic_path=None, comments=None, rating=None):
        user = info.context.user
        needs_new_movie = False
        if user.is_anonymous:
            raise GraphQLError("Login to create a Movie Collection Item.")

        # Gets the Movie Collection that the Collection Item will be added to
        try:
            movie_collection = MovieCollection.objects.get(
                id=movie_collection_id)
        except:
            raise GraphQLError(
                f"{movie_collection_id} is not a valid Movie Collection ID")

        # Looks for a Movie with the TMDb ID if one exists or looks for a Movie matching the supplied title and date (for manually added Movies)
        # Determines if a Movie needs to be created for the CollectionItem to be related to
        if tmdb_id != None:
            try:
                movie = Movie.objects.get(tmdb_id=tmdb_id)
            except:
                needs_new_movie = True
        elif tmdb_id == None:
            try:
                temp_movie = Movie.objects.get(title=title)
                if temp_movie.release_year == release_year:
                    movie = temp_movie
                else:
                    needs_new_movie = True
            except:
                needs_new_movie = True

        # If a new Movie is needed, it is created here and assigned to the "movie" variable
        if needs_new_movie:
            if not title:
                raise GraphQLError(
                    "You must provide a title to add a movie to a collection.")
            elif not summary:
                raise GraphQLError(
                    "You must provide a summary to add a movie to a collection.")
            else:
                movie = Movie(
                    title=title)
                if tmdb_id:
                    movie.tmdb_id = tmdb_id
                if summary:
                    movie.summary = summary
                if pic_path:
                    movie.pic_path = pic_path
                if imdb_id:
                    movie.imdb_id = imdb_id
                if release_year:
                    movie.release_year = release_year
                movie.save(title_updated=True)

        possible_matches = CollectionItem.objects.filter(
            movie__release_year=release_year)
        if len(possible_matches) == 0:
            pass
        else:
            for pm in possible_matches:
                if pm.movie.full_title == title:
                    collection_item = pm
                    collection_item.views += 1
                    collection_item.save()
                    return CreateCollectionItem(collection_item=collection_item)

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
        views = graphene.Int()

    @login_required
    def mutate(self, info, id, comments=None, rating=None, views=None):
        try:
            collection_item = CollectionItem.objects.get(id=id)
        except:
            raise GraphQLError(
                "A valid Movie Collection Item ID was not provided.")

        if comments:
            collection_item.comments = comments
        if rating:
            collection_item.rating = rating
        if views:
            collection_item.views += views

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
