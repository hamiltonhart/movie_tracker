import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from .models import Plant


class PlantType(DjangoObjectType):
    class Meta:
        model = Plant


# Queries

class Query(graphene.ObjectType):
    plants = graphene.List(PlantType)
    plant = graphene.Field(PlantType, id=graphene.Int(required=True))

    def resolve_plants(self, info):
        return Plant.objects.all().order_by("name")

    def resolve_plant(self, info, id):
        try:
            return Plant.objects.get(id=id)
        except:
            return GraphQLError(f'A valid Plant ID was not provided. {id} was given.')


# Mutations

class UpdatePlant(graphene.Mutation):
    plant = graphene.Field(PlantType)

    class Arguments:
        id = graphene.Int(required=True)
        name = graphene.String()
        sci_name = graphene.String()
        type = graphene.String()

    @login_required
    def mutate(self, info, id, name=None, sci_name=None, type=None):

        try:
            plant = Plant.objects.get(id=id)
        except:
            raise GraphQLError(f"Could not find a plant with the ID {id}.")

        if name:
            plant.name = name
        if sci_name:
            plant.sci_name = sci_name
        if type:
            plant.type = type

        try:
            plant.save()
        except:
            raise GraphQLError(f"{plant.name} could not be saved.")

        return UpdatePlant(plant=plant)


class DeletePlant(graphene.Mutation):
    id = graphene.Int()

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        try:
            plant = Plant.objects.get(id=id)
        except:
            raise GraphQLError(f"There is no Plant with the ID {id}.")

        try:
            plant.delete()
        except:
            raise GraphQLError(f"{plant.name} could not be deleted.")

        return DeletePlant(id=id)


class Mutation(graphene.ObjectType):
    update_plant = UpdatePlant.Field()
    delete_plant = DeletePlant.Field()
