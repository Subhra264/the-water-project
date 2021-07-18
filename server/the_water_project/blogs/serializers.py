from the_water_project.users.serializers import OnlyIdAndNameUserSerializer
from django.utils.text import Truncator
from .models import Blog, Like
from rest_framework import serializers


class OnlyNumberOfLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ("no_of_likes",)


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"


class ContentField(serializers.RelatedField):
    def to_representation(self, value):
        if "is_list" in self.context:
            truncated_value = Truncator(value).chars(100)
            return truncated_value
        else:
            return value


class BlogSerializer(serializers.ModelSerializer):
    likes = OnlyNumberOfLikesSerializer()
    content = ContentField(read_only=True)
    user = OnlyIdAndNameUserSerializer()

    class Meta:
        model = Blog
        fields = "__all__"
