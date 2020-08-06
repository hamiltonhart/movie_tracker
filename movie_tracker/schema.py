import graphene
import graphql_jwt
from graphene_django import DjangoObjectType

# import app schemas
# import myapp.schema

# Add each schema for each app to the Query class and Mutation class respectively
# class Query(
#     myapp.schema.Query,
#     graphene.ObjectType
# ):
#     pass


class Mutation(
    myapp.schema.Mutation,
    graphene.ObjectType
):
    # These are part of django-graphql-jwt and allow for authentication
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
