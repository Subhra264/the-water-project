from rest_framework.generics import ListAPIView
from .models import Tag
from the_water_project.topics.serializers import TopicSerializer, IssueSerializer
from .serializers import TagSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import APIException


class TagViewSet(ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    pagination_class = None


class TagRelatedTopicsApiView(ListAPIView):
    serializer_class = TopicSerializer

    def get_queryset(self):
        try:
            tag = Tag.objects.get(id=self.kwargs.get("tag_id"))
            topics = tag.topic_set.all()
        except Exception:
            raise APIException("tag with the specified is not found or unable to fetch topics with specified tag id")
        else:
            return topics


class TagRelatedIssuesApiView(ListAPIView):
    serializer_class = IssueSerializer

    def get_queryset(self):
        try:
            tag = Tag.objects.get(id=self.kwargs.get("tag_id"))
            issues = tag.issue_set.all()
        except Exception:
            raise APIException("tag with the specified id not found or unable to fetch issues with specified tag id")
        else:
            return issues
