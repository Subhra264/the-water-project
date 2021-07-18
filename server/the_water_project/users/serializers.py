from the_water_project.topics.models import Topic
from rest_framework import serializers
from .models import Organization
from django.contrib.auth import get_user_model

User = get_user_model()


class TopicCreatorRelatedField(serializers.RelatedField):
    def to_representation(self, value):
        if isinstance(value, Topic):
            return value.id
        else:
            raise Exception("The value of this field is not supported")


class UserSerializer(serializers.ModelSerializer):
    topics = TopicCreatorRelatedField(many=True, queryset=Topic.objects.all())
    no_of_contributions =  serializers.SerializerMethodField()

    def get_no_of_contributions(self, obj):
        return obj.get_no_of_contributions()

    class Meta:
        model = User
        exclude = ["password", "is_staff", "is_active", "is_superuser", "user_permissions", "groups"]

class OnlyIdAndNameUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", )


class OrgSerializer(serializers.ModelSerializer):
    topics = TopicCreatorRelatedField(many=True, queryset=Topic.objects.all())

    class Meta:
        model = Organization
        exclude = ["password"]


class OnlyIdAndNameOrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ("id", "name", )