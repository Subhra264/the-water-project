from .models import IssueComment, StartingComment, TopicDiscussion
from rest_framework import serializers


class StartingCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StartingComment
        fields = "__all__"


class IssueCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueComment
        fields = "__all__"


class TopicDiscussionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicDiscussion
        fields = "__all__"
