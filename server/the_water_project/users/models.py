# the user should have rating system, contribution history etc.
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, UserManager
from the_water_project.utils import COUNTRY_CHOICES
from django.core.validators import RegexValidator


# TODO: need to check whether the organization is govt registered or not


class TheUserManager(UserManager):
    def create_user(self, username, email, country, age=None, address=None, password=None, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, country=country, age=age, address=address, **extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, username, email, country, age=None, address=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        user = self.create_user(username, email, country, age, address, password, **extra_fields)
        return user


class User(AbstractUser):
    country = models.CharField(max_length=60, choices=COUNTRY_CHOICES)
    age = models.PositiveIntegerField(blank=True, null=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    rating = models.FloatField(default=0.0)
    topics = GenericRelation("topics.Topic", "object_id", "content_type", related_query_name="users")

    objects = TheUserManager()
    REQUIRED_FIELDS = ["email", "country"]

    def __str__(self) -> str:
        return super().__str__()


class OrganizationManager(BaseUserManager):
    def create_org(self, name, email, address, phone_number, owner, password):
        email = self.normalize_email(email)
        org = self.model(name=name, email=email, address=address, phone_number=phone_number, owner=owner)
        org.set_password(password)
        org.save()
        return org


class Organization(AbstractBaseUser):
    name = models.CharField(max_length=120)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=200)
    phone_regex = RegexValidator(
        regex=r"^\+?1?\d{9,15}$",
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.",
    )
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    no_of_members = models.PositiveIntegerField(default=0)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="members", blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="owner")
    date_joined = models.DateTimeField(auto_now_add=True)
    rating = models.FloatField(default=0.0)
    topics = GenericRelation("topics.Topic", "object_id", "content_type", related_query_name="orgs")
    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["phone_number", "owner", "address", "name"]

    objects = OrganizationManager()

    def __str__(self) -> str:
        return self.name

    def add_member(self, member):
        if isinstance(member, get_user_model()):
            try:
                self.members.add(member)
            except Exception:
                print("Something went wrong while adding a member to the org")
            else:
                self.no_of_members += 1
                self.save()
        else:
            print("Can not add a member that is not a User")

    def remove_member(self, user):
        try:
            self.members.remove(user)
        except Exception:
            print("user is not a part of this org already")
        else:
            self.no_of_members -= 1
            self.save()
