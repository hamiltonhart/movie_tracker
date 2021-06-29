import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from .models import PlantItem
from plant.models import Plant
from plant_type.models import PlantType


class PlantItemType(DjangoObjectType):
    class Meta:
        model = PlantItem

# Queries


class Query(graphene.ObjectType):
    pass


# Mutations

class CreatePlantItem(graphene.Mutation):
    plant_item = graphene.Field(PlantItemType)

    class Arguments:
        plant_id = graphene.Int()
        name = graphene.String(required=True)
        sci_name = graphene.String()
        types = graphene.String(required=True)
        location = graphene.String()

    @login_required
    def mutate(self, info, name, types, plant_id=None, sci_name=None, location=None):
        user = info.context.user

        # Checks that a user is logged in
        if user.is_anonymous:
            raise GraphQLError(
                f"You must be logged in to add a plant. User is {user}")

        # If a plant_id is provided, gets the Plant with that ID and stores it in current_plant
        if plant_id:
            try:
                current_plant = Plant.objects.get(id=plant_id)
            except:
                raise GraphQLError(
                    f"A valid Plant ID was not supplied. {plant_id} was provided.")
        else:
            plant_types = []
            plant_string_types = [x.replace(" ", "").lower()
                                  for x in types.split(",")]

            for type_string in plant_string_types:
                try:
                    current_type = PlantType.objects.get(
                        type_label=type_string)
                    plant_types.append(current_type)
                except:
                    current_type = PlantType.objects.create(
                        type_label=type_string)
                    current_type.save()
                    plant_types.append(current_type)

            current_plant = Plant.objects.create(name=name, types=plant_types)
            if sci_name:
                current_plant.sci_name = sci_name
            current_plant.save()

        try:
            plant_item = PlantItem.objects.create(
                plant=current_plant, location=location)
            plant_item.save()
        except:
            raise GraphQLError("A new Plant Item was not able to be created.")

        return CreatePlantItem(plant_item=plant_item)


class UpdatePlantItem(graphene.Mutation):
    plant_item = graphene.Field(PlantItemType)

    class Arguments:
        plant_item_id = graphene.Int(required=True)
        location = graphene.String()

    @login_required
    def mutate(self, info, plant_item_id, location=None):
        user = info.context.user

        # Checks that a user is logged in
        if user.is_anonymous == False:
            raise GraphQLError("You must be logged in to add a plant.")

        # If a plant_id is provided, gets the Plant with that ID and stores it in current_plant
        try:
            plant_item = PlantItem.objects.get(id=plant_item_id)
            plant_item.save()
        except:
            raise GraphQLError(
                f"A valid Plant ID was not supplied. {plant_item_id} was provided.")

        return UpdatePlantItem(plant_item=plant_item)


class DeletePlantItem(graphene.Mutation):
    id = graphene.Int()

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        try:
            plant_item = PlantItem.objects.get(id=id)
        except:
            raise GraphQLError(
                f"A valid Plant Item ID was not supplied. {id} was provided.")

        try:
            plant_item.delete()
        except:
            raise GraphQLError(
                f"{plant_item.name} with the ID {id} could not be deleted.")

        return DeletePlantItem(id=id)


class Mutation(graphene.ObjectType):
    create_plant_item = CreatePlantItem.Field()
    update_plant_item = UpdatePlantItem.Field()
    delete_plant_item = DeletePlantItem.Field()
