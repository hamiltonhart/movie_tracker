import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required, superuser_required

from .models import CustomUser

# Queries


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser


class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    user = graphene.Field(UserType, id=graphene.Int(required=True))
    me = graphene.Field(UserType)
    active_users = graphene.List(UserType)
    list_users = graphene.List(UserType)

    @superuser_required
    def resolve_users(self, info):
        return CustomUser.objects.all()

    @superuser_required
    def resolve_user(self, info, id):
        return CustomUser.objects.get(id=id)

    @login_required
    def resolve_me(self, info):
        user = info.context.user
        return user

    @superuser_required
    def resolve_active_users(self, info):
        return CustomUser.objects.filter(is_active=True)

    @login_required
    def resolve_list_users(self, info):
        return CustomUser.objects.filter(is_list_user=True)

# Mutations


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        is_staff = graphene.Boolean()
        is_superuser = graphene.Boolean()
        is_list_user = graphene.Boolean()

    def mutate(self, info, username, email, password, is_staff=False, is_superuser=False, is_list_user=True):
        user = CustomUser(username=username, email=email,
                          is_staff=is_staff, is_superuser=is_superuser, is_list_user=is_list_user)
        user.set_password(password)
        user.save()
        return CreateUser(user=user)


class UpdateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        id = graphene.Int(required=True)
        username = graphene.String()
        password = graphene.String()
        email = graphene.String()
        is_staff = graphene.Boolean()
        is_superuser = graphene.Boolean()
        is_list_user = graphene.Boolean()

    @login_required
    def mutate(self, info, id, username=None, password=None, email=None, is_staff=None, is_superuser=False, is_list_user=True):
        try:
            user = CustomUser.objects.get(id=id)
        except:
            raise GraphQLError("User does not exist")

        current_user = info.context.user

        if current_user == user or current_user.is_superuser:
            if username:
                user.username = username
            if password:
                user.set_password(password)
            if email:
                user.email = email
            if is_staff != None:
                user.is_staff = is_staff
            if is_superuser != None:
                user.is_superuser = is_superuser
            if is_list_user != None:
                user.is_list_user = is_list_user

            user.save()
            return UpdateUser(user=user)
        else:
            raise GraphQLError(f"{current_user} cannot change {user}")


class ActiveUserToggle(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        id = graphene.Int(required=True)

    @superuser_required
    def mutate(self, info, id):
        try:
            user = CustomUser.objects.get(id=id)
        except:
            raise GraphQLError("Not a valid ID")

        user.is_active = not user.is_active
        user.save()

        return ActiveUserToggle(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    update_user = UpdateUser.Field()
    active_user_toggle = ActiveUserToggle.Field()
