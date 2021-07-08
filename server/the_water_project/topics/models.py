from the_water_project.users.models import Organization
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models
from the_water_project.tags.models import Tag
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey


class Topic(models.Model):
    limit = models.Q(app_label="users", model="User") | models.Q(app_label="users", model="Organization")
    content_type = models.ForeignKey(ContentType, limit_choices_to=limit, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    creator = GenericForeignKey("content_type", "object_id")
    title = models.CharField(max_length=150)
    date = models.DateTimeField(auto_now_add=True)
    description = models.OneToOneField("comments.StartingComment", on_delete=models.CASCADE)
    is_closed = models.BooleanField(default=False)
    stars = models.PositiveIntegerField(default=0)
    no_of_issues = models.PositiveIntegerField(default=0)
    tags = models.ManyToManyField(Tag, blank=True)
    contributors = models.ManyToManyField(settings.AUTH_USER_MODEL, through="Contribution")

    def save(self, *args, **extra_fields) -> None:
        type_of_creator = None
        if self.creator:
            if isinstance(self.creator, get_user_model()) or isinstance(self.creator, Organization):
                type_of_creator = type(self.creator)
                print(self.creator, " is the creator")
                self.content_type = ContentType.objects.get_for_model(self.creator)
                super().save(*args, **extra_fields)
                print(self.creator)
            else:
                raise Exception("creator must be one of User and Organization")
        else:
            raise Exception("creator field must be defined")
        if type_of_creator:
            creator = None
            if type_of_creator is Organization:
                creator = self.creator.owner
            if type_of_creator is get_user_model():
                creator = self.creator
            if creator not in self.contributors.all():
                Contribution.objects.create(contributor=creator, topic=self, no_of_contributions=1)

    def __str__(self) -> str:
        return "Topic - " + self.title


class Contribution(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    contributor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    no_of_contributions = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return self.contributor.username + " Contributed"


class Issue(models.Model):
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    date = models.DateTimeField(auto_now_add=True)
    description = models.OneToOneField("comments.StartingComment", on_delete=models.CASCADE)
    is_closed = models.BooleanField(default=False)
    no_of_comments = models.PositiveIntegerField(default=0)
    tags = models.ManyToManyField(Tag, blank=True)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.title
