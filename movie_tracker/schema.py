import graphene
import graphql_jwt
from graphene_django import DjangoObjectType

# import app schemas
import plant.schema
import plant_item.schema
import movie.schema
import movie_collections.schema
import collection_item.schema
import users.schema

# Add each schema for each app to the Query class and Mutation class respectively


class Query(
    plant.schema.Query,
    plant_item.schema.Query,
    movie.schema.Query,
    movie_collections.schema.Query,
    collection_item.schema.Query,
    users.schema.Query,
    graphene.ObjectType
):
    pass


class Mutation(
    plant.schema.Mutation,
    plant_item.schema.Mutation,
    movie.schema.Mutation,
    movie_collections.schema.Mutation,
    collection_item.schema.Mutation,
    users.schema.Mutation,
    graphene.ObjectType
):
    # These are part of django-graphql-jwt and allow for authentication
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
