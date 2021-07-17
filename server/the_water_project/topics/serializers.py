from rest_framework import serializers
from the_water_project.tags.models import Tag
from the_water_project.users.models import Organization
from the_water_project.users.serializers import UserSerializer, OrgSerializer
from the_water_project.comments.serializers import StartingCommentSerializer
from the_water_project.tags.serializers import TagSerializer
from django.utils.text import Truncator
from .models import Topic, Issue, Contribution
from django.contrib.auth import get_user_model


class CreatorField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, get_user_model()):
            user_serializer = UserSerializer(value)
            return {"user": user_serializer.data}
        elif isinstance(value, Organization):
            org = OrgSerializer(value)
            return {"org": org.data}
        else:
            raise Exception("can not serialize creator field")


class StartingCommentField(serializers.RelatedField):
    def to_representation(self, value):
        if "is_list" in self.context:
            content = Truncator(value.content).chars(200)
            value.content = content
        return StartingCommentSerializer(value).data


class TagField(serializers.RelatedField):
    def to_representation(self, value):
        if value:
            return TagSerializer(value, many=True).data
        else:
            return None


class TopicSerializer(serializers.ModelSerializer):
    creator = CreatorField(read_only=True)
    description = StartingCommentField(read_only=True)
    tags = TagField(queryset=Tag.objects.all(), required=False)

    class Meta:
        model = Topic
        fields = (
            "id",
            "description",
            "date",
            "is_closed",
            "no_of_issues",
            "progress_report",
            "updated_on",
            "stars",
            "title",
            "creator",
            "tags",
            "contributors",
        )


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = "__all__"


class ContributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contribution
        fields = "__all__"
