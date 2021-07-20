from the_water_project.users.serializers import OnlyIdAndNameUserSerializer
from .models import (
    IssueComment,
    StartingComment,
    TopicDiscussion,
    TopicCommentLike,
    IssueCommentLike,
    StartingCommentLike,
)
from rest_framework import serializers


class OnlyLikeNumStartingCommentSerializer(serializers.ModelSerializer):
    user_liked = serializers.SerializerMethodField()

    class Meta:
        model = StartingCommentLike
        fields = ("no_of_likes", "user_liked")

    def get_user_liked(self, obj):
        user = self.parent.context.get("request_user")
        if user:
            if user in obj.users.all():
                return True
            else:
                return False


class StartingCommentSerializer(serializers.ModelSerializer):
    likes = OnlyLikeNumStartingCommentSerializer()
    creator = OnlyIdAndNameUserSerializer()

    class Meta:
        model = StartingComment
        fields = "__all__"


class OnlyLikeNumIssueCommentSerializer(serializers.ModelSerializer):
    user_liked = serializers.SerializerMethodField()

    class Meta:
        model = IssueCommentLike
        fields = ("no_of_likes", "user_liked")

    def get_user_liked(self, obj):
        user = self.parent.context.get("request_user")
        if user:
            if user in obj.users.all():
                return True
            else:
                return False


class IssueCommentSerializer(serializers.ModelSerializer):
    likes = OnlyLikeNumIssueCommentSerializer()
    creator = OnlyIdAndNameUserSerializer()

    class Meta:
        model = IssueComment
        fields = "__all__"


class OnlyLikeNumTopicCommentSerializer(serializers.ModelSerializer):
    user_liked = serializers.SerializerMethodField()

    class Meta:
        model = TopicCommentLike
        fields = ("no_of_likes", "user_liked")

    def get_user_liked(self, obj):
        user = self.parent.context.get("request_user")
        if user:
            if user in obj.users.all():
                return True
            else:
                return False


class TopicDiscussionSerializer(serializers.ModelSerializer):
    likes = OnlyLikeNumTopicCommentSerializer()
    creator = OnlyIdAndNameUserSerializer()

    class Meta:
        model = TopicDiscussion
        fields = "__all__"


class StartingCommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StartingCommentLike
        fields = "__all__"


class TopicCommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicCommentLike
        fields = "__all__"


class IssueCommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueCommentLike
        fields = "__all__"
