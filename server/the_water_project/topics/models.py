from django.utils import timezone
from the_water_project.progress_report.models import ProgressReport
from the_water_project.users.models import Organization
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models
from the_water_project.utils import COUNTRY_CHOICES
from the_water_project.tags.models import Tag
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey


class Topic(models.Model):
    limit = models.Q(app_label="users", model="User") | models.Q(app_label="users", model="Organization")
    content_type = models.ForeignKey(ContentType, limit_choices_to=limit, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    creator = GenericForeignKey("content_type", "object_id")
    title = models.CharField(max_length=150)
    progress_report = models.OneToOneField(
        ProgressReport, on_delete=models.CASCADE, blank=True, null=True, related_name="topic"
    )
    date = models.DateTimeField(auto_now_add=True)
    description = models.OneToOneField("comments.StartingComment", on_delete=models.CASCADE)
    is_closed = models.BooleanField(default=False)
    closed_on = models.DateTimeField(blank=True, null=True)
    updated_on = models.DateTimeField()
    country = models.CharField(choices=COUNTRY_CHOICES, max_length=60)
    city_or_area = models.CharField(max_length=30)
    address = models.CharField(max_length=150)
    stars = models.PositiveIntegerField(default=0)
    no_of_issues = models.PositiveIntegerField(default=0)
    no_of_comments = models.PositiveBigIntegerField(default=0)
    tags = models.ManyToManyField(Tag, blank=True)
    contributors = models.ManyToManyField(settings.AUTH_USER_MODEL, through="Contribution")

    class Meta:
        ordering = ("-updated_on", "-stars")

    def save(self, *args, **extra_fields) -> None:
        type_of_creator = None
        if self.creator:
            if isinstance(self.creator, get_user_model()) or isinstance(self.creator, Organization):
                type_of_creator = type(self.creator)
                self.content_type = ContentType.objects.get_for_model(self.creator)
                if not self.updated_on:
                    self.updated_on = timezone.now()
                super().save(*args, **extra_fields)
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
    closed_on = models.DateTimeField(blank=True, null=True)
    no_of_comments = models.PositiveIntegerField(default=0)
    tags = models.ManyToManyField(Tag, blank=True)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)

    class Meta:
        ordering = ("-date",)

    def __str__(self) -> str:
        return self.title
