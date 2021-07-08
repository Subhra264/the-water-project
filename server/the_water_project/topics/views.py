from .models import Topic, Issue, Contribution
from .serializers import TopicSerializer, IssueSerializer, ContributionSerializer
from rest_framework.viewsets import ModelViewSet


class TopicViewSet(ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class IssueViewSet(ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer


class ContributionViewSet(ModelViewSet):
    queryset = Contribution.objects.all()
    serializer_class = ContributionSerializer
