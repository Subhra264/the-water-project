from rest_framework.viewsets import ModelViewSet
from .models import StartingComment, IssueComment, TopicDiscussion
from .serializers import StartingCommentSerializer, IssueCommentSerializer, TopicDiscussionSerializer


class StartingCommentViewSet(ModelViewSet):
    queryset = StartingComment.objects.all()
    serializer_class = StartingCommentSerializer


class IssueCommentViewSet(ModelViewSet):
    queryset = IssueComment.objects.all()
    serializer_class = IssueCommentSerializer


class TopicDiscussionViewSet(ModelViewSet):
    queryset = TopicDiscussion.objects.all()
    serializer_class = TopicDiscussionSerializer
