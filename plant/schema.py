from plant_item.schema import PlantItemType
import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required

from django.db import IntegrityError

from .models import Plant
from plant_item.models import PlantItem
from plant_type.models import PlantType as PlantTypeModel

from plant_item.schema import PlantItemType


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

class CreatePlant(graphene.Mutation):
    plant = graphene.Field(PlantType)

    class Arguments:
        name = graphene.String(required=True)
        sci_name = graphene.String()
        types = graphene.String(required=True)
        location = graphene.String(required=True)

    @login_required
    def mutate(self, info, name, types, location, sci_name=None):
        user = info.context.user
        new_plant = True

        # Checks that a user is logged in
        if user.is_anonymous:
            raise GraphQLError(
                f"You must be logged in to add a plant.")

        try:
            current_plant = Plant.objects.get(name__iexact=name)
            new_plant = False
        except:
            try:
                current_plant = Plant.objects.create(name=name)
            except:
                raise GraphQLError(f"Cannot create a plant called {name}.")

        # Checks if a new plant is being created and runs the code below
        # Parse the types by comma and cast them as lowercase.
        # If the PlantType already exists, get that type and add it to the Plant, otherwise, create the PlantType and add it to the current plant
        if new_plant:
            if types:
                plant_types = []
                plant_string_types = [x.replace(" ", "").lower()
                                      for x in types.split(",")]

                for type_string in plant_string_types:
                    if type_string == "" or type_string == " ":
                        pass
                    else:
                        try:
                            current_type = PlantTypeModel.objects.get(
                                type_label=type_string)
                            plant_types.append(current_type)
                        except:
                            current_type = PlantTypeModel.objects.create(
                                type_label=type_string)
                            current_type.save()
                            plant_types.append(current_type)

                current_plant.types.set(plant_types)

            if sci_name:
                current_plant.sci_name = sci_name

        # Will run so long as an Error was not raised
        current_plant.save()

        # When creating a new plant, a new plant_item is assumed and is created here
        try:
            plant_item = PlantItem.objects.create(
                plant=current_plant, location=location)
            plant_item.save()
        except:
            raise GraphQLError("A new Plant Item was not able to be created.")

        return CreatePlant(plant=current_plant)


class UpdatePlant(graphene.Mutation):
    plant = graphene.Field(PlantType)

    class Arguments:
        id = graphene.Int(required=True)
        name = graphene.String()
        sci_name = graphene.String()
        types = graphene.String()
        delete_items = graphene.List(graphene.Int)
        plants = graphene.List(graphene.List(graphene.String))
        comments = graphene.String()
        watering_instructions = graphene.String()

    @ login_required
    def mutate(self, info, id, name=None, sci_name=None, types=None, delete_items=[], plants=[], comments=None, watering_instructions=None):

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
        if comments:
            plant.comments = comments
        if watering_instructions:
            plant.watering_instructions = watering_instructions

        # Checks that there are plants provided
        # If the plant id is in the delete_items list provided, the PlantItem with that ID is deleted and the id is removed from the delete_items list for efficiency
        # If the plant id is NOT in the delete_items list, the plant item will be retrieved and the location on the db will match what is provided.
        if len(delete_items) > 0:
            for delete_id in delete_items:
                try:
                    item_to_delete = PlantItem.objects.get(id=delete_id)
                    item_to_delete.delete()
                except:
                    print(f"Could not delete Plant Item with ID {delete_id}.")

        if len(plants) > 0:
            for plant_item in plants:
                try:
                    plant_to_update = PlantItem.objects.get(
                        id=int(plant_item[0]))
                    plant_to_update.location = plant_item[1]
                    plant_to_update.save()
                except:
                    print(
                        f"Could not update location of Plant Item with ID {plant_item[0]}.")

        # for item_id in delete_items:
        #     try:
        #         item_to_delete = plant.plants.get(id=item_id)
        #         item_to_delete.delete()
        #     except:
        #         print(
        #             f"The Plant Item with ID {item_id} could not be removed from {plant.name}.")

        # If types (plant_types) are provided, parse the types by comma and cast them as lowercase.
        # If the PlantType already exists, get that type and add it to the Plant, otherwise, create the PlantType and add it to the current plant
        if types:
            plant_types = []
            current_types = plant.types.all()
            plant_string_types = [x.replace(" ", "").lower()
                                  for x in types.split(",")]

            for type_string in plant_string_types:
                move_to_next = False
                if type_string == "" or type_string == " ":
                    pass
                else:
                    for existing_type in current_types:
                        if type_string == existing_type.type_label:
                            plant_types.append(existing_type)
                            move_to_next = True
                    if not move_to_next:
                        try:
                            current_type = PlantTypeModel.objects.get(
                                type_label=type_string)
                            plant_types.append(current_type)
                        except:
                            current_type = PlantTypeModel.objects.create(
                                type_label=type_string)
                            current_type.save()
                            plant_types.append(current_type)

            plant.types.set(plant_types)

        try:
            plant.save()
        except:
            raise GraphQLError(f"{plant.name} could not be saved.")

        return UpdatePlant(plant=plant)


class DeletePlant(graphene.Mutation):
    id = graphene.Int()

    class Arguments:
        id = graphene.Int(required=True)

    @ login_required
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
    create_plant = CreatePlant.Field()
    update_plant = UpdatePlant.Field()
    delete_plant = DeletePlant.Field()
