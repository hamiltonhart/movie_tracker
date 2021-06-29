import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from .models import PlantType


class PlantTypeType(DjangoObjectType):
    class Meta:
        model = PlantType

# Queries


class Query(graphene.ObjectType):
    pass
