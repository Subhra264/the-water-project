from rest_framework.exceptions import NotFound
from the_water_project.topics.serializers import TopicSerializer
from rest_framework.generics import ListAPIView
from .models import Organization
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, OrgSerializer
from rest_framework.viewsets import ModelViewSet

User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class OrgViewSet(ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrgSerializer


class UserRelatedTopicApiView(ListAPIView):
    serializer_class = TopicSerializer

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        try:
            user = User.objects.get(id=user_id)
            topics = user.topic_set.all()
        except Exception:
            raise NotFound("could not fetch topic data for the specified user")
        else:
            return topics

    def get_serializer(self, *args, **kwargs):
        kwargs["context"] = {"is_list": True}
        return super().get_serializer(*args, **kwargs)


class NgoRelatedTopicApiView(ListAPIView):
    serializer_class = TopicSerializer

    def get_queryset(self):
        try:
            ngo = Organization.objects.get(id=self.kwargs["ngo_id"])
            print(ngo)
            print(ngo.topics.all(), " are the topics of ngo")
            topics = ngo.topics.all()
        except Exception:
            raise NotFound("Ngo id was not correct.")
        else:
            return topics

    def get_serializer(self, *args, **kwargs):
        kwargs["context"] = {"is_list": True}
        return super().get_serializer(*args, **kwargs)