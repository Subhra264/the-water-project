from rest_framework import serializers
from the_water_project.users.models import Organization
from .models import Topic, Issue
from django.contrib.auth import get_user_model


class CreatorField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, get_user_model()):
            return {"user": value.id}
        elif isinstance(value, Organization):
            return {"org": value.id}
        else:
            raise Exception("can not serialize creator field")


class TopicSerializer(serializers.ModelSerializer):
    creator = CreatorField(read_only=True)

    class Meta:
        model = Topic
        fields = ("id", "description", "date", "is_closed", "no_of_issues", "stars", "title", "creator")


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = "__all__"
