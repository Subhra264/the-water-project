from the_water_project.tags.serializers import TagSerializer
from the_water_project.tags.models import Tag
from the_water_project.users.serializers import OnlyIdAndNameUserSerializer
from django.utils.text import Truncator
from .models import Blog, Like
from rest_framework import serializers


class OnlyNumberOfLikesSerializer(serializers.ModelSerializer):
    user_liked = serializers.SerializerMethodField()

    class Meta:
        model = Like
        fields = ("no_of_likes", "user_liked")

    def get_user_liked(self, obj):
        user = self.parent.context.get("request_user")
        if user:
            if user in obj.users.all():
                return True
            else:
                return False


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
    creator = OnlyIdAndNameUserSerializer()
    tags = TagSerializer(Tag.objects.all(), many=True, required=False)

    class Meta:
        model = Blog
        fields = "__all__"
