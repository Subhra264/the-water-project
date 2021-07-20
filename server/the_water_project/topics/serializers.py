from rest_framework import serializers
from the_water_project.tags.models import Tag
from the_water_project.users.models import Organization
from the_water_project.users.serializers import OnlyIdAndNameUserSerializer, OnlyIdAndNameOrgSerializer
from the_water_project.comments.serializers import StartingCommentSerializer
from the_water_project.tags.serializers import TagSerializer
from django.utils.text import Truncator
from .models import Topic, Issue, Contribution
from django.contrib.auth import get_user_model


class CreatorField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, get_user_model()):
            user_serializer = OnlyIdAndNameUserSerializer(value)
            return {"user": user_serializer.data}
        elif isinstance(value, Organization):
            org = OnlyIdAndNameOrgSerializer(value)
            return {"org": org.data}
        else:
            raise Exception("can not serialize creator field")


class ContributorField(serializers.RelatedField):
    def to_representation(self, value):
        serialized_data = OnlyIdAndNameUserSerializer(value, many=True).data
        return serialized_data


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
    contributors = ContributorField(queryset=get_user_model().objects.all())
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
            "no_of_comments",
            "progress_report",
            "updated_on",
            "closed_on",
            "country",
            "city_or_area",
            "address",
            "stars",
            "title",
            "creator",
            "tags",
            "contributors",
        )


class IssueSerializer(serializers.ModelSerializer):
    creator = CreatorField(read_only=True)
    tags = TagField(queryset=Tag.objects.all(), required=False)

    class Meta:
        model = Issue
        fields = "__all__"


class ContributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contribution
        fields = "__all__"
