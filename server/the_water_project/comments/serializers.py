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
    class Meta:
        model = StartingCommentLike
        fields = ("no_of_likes",)


class StartingCommentSerializer(serializers.ModelSerializer):
    likes = OnlyLikeNumStartingCommentSerializer()

    class Meta:
        model = StartingComment
        fields = "__all__"


class OnlyLikeNumIssueCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueCommentLike
        fields = ("no_of_likes",)


class IssueCommentSerializer(serializers.ModelSerializer):
    likes = OnlyLikeNumIssueCommentSerializer()

    class Meta:
        model = IssueComment
        fields = "__all__"


class OnlyLikeNumTopicCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicCommentLike
        fields = ("no_of_likes",)


class TopicDiscussionSerializer(serializers.ModelSerializer):
    likes = OnlyLikeNumTopicCommentSerializer()

    class Meta:
        model = TopicDiscussion
        fields = "__all__"


class StartingCommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StartingCommentLike
        fields = "__all__"


class TopicCommentLike(serializers.ModelSerializer):
    class Meta:
        model = TopicCommentLike
        fields = "__all__"


class IssueCommentLike(serializers.ModelSerializer):
    class Meta:
        model = IssueCommentLike
        fields = "__all__"
