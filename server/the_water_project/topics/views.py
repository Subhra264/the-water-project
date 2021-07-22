from django.utils import timezone
from rest_framework.generics import ListAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from the_water_project.utils.permissions import (
    IsTopicOwnerOrMemberOrReject,
    IsOwnerOrReject,
    IsIssueOwnerOrMemberOrReject,
)
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from the_water_project.tags.models import Tag
from the_water_project.tags.serializers import TagSerializer
from the_water_project.users.models import Organization
from the_water_project.users.serializers import UserSerializer
from .models import Topic, Issue, Contribution
from rest_framework.exceptions import NotFound, APIException
from the_water_project.comments.models import StartingComment
from .serializers import TopicSerializer, IssueSerializer, ContributionSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .filters import TopicListFilterBackEnd, TopicListFilterSet
from rest_framework.filters import OrderingFilter, SearchFilter


class TopicViewSet(ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    parser_classes = (JSONParser, FormParser, MultiPartParser)
    http_method_names = ["get", "patch", "post", "delete", "head"]
    filter_backends = (TopicListFilterBackEnd, SearchFilter, OrderingFilter)
    filterset_class = TopicListFilterSet
    search_fields = [
        "title",
        "description__content",
        "city_or_area",
        "address",
        "contributors__username",
    ]
    ordering_fields = ["-updated_on", "-no_of_issues", "title"]

    def get_serializer(self, *args, **kwargs):
        if self.action == "list":
            kwargs["context"] = {"is_list": True}
        elif self.action == "retrieve":
            kwargs["context"] = {"request_user": self.request.user}
        return super().get_serializer(*args, **kwargs)

    def get_permissions(self):
        if self.request.method == "PATCH" or self.request.method == "DELETE":
            self.permission_classes = (IsAuthenticated, IsTopicOwnerOrMemberOrReject)
        return super().get_permissions()

    def list(self, request, *args, **kwargs):
        if len(request.query_params):
            queryset = self.filter_queryset(self.get_queryset())
        else:
            queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            listed_data = self.list_format_creator(page)
            return Response(listed_data)
        listed_data = self.list_format_creator(queryset)
        return Response(listed_data)

    def list_format_creator(self, queryset):
        listed_data = {"topics": []}
        for instance in queryset:
            serialized_instance = self.get_serializer(instance)
            data = serialized_instance.data
            instance_data = {
                "id": data["id"],
                "img": data["img"],
                "topic_details": {
                    "description": {
                        "title": data["title"],
                        "date": data["date"],
                        "brief_description": data["description"]["content"],
                    },
                    "opened_by": {
                        "org": None,
                        "user": None,
                    },
                    "meta_data": {
                        "tags": [],
                        "is_closed": data["is_closed"],
                        "no_of_issues": data["no_of_issues"],
                        "no_of_comments": data["no_of_comments"],
                        "upvotes": data["description"]["likes"]["no_of_likes"],
                    },
                },
            }
            if data["tags"]:
                instance_data["topic_details"]["meta_data"]["tags"] = [tag["name"] for tag in data["tags"]]
            instance_data["topic_details"]["opened_by"]["user"] = data["description"]["creator"]
            if "org" in data["creator"]:
                instance_data["topic_details"]["opened_by"]["org"] = data["creator"].get("org")

            listed_data["topics"].append(instance_data)
        return listed_data

    def create(self, request, *args, **kwargs):
        try:
            title = request.data["title"]
            description = request.data["description"]
            country = request.data["country"]
            city_or_area = request.data["city_or_area"]
            address = request.data["address"]
            img = request.data.get("img")
        except Exception:
            raise APIException("You didn't provide essential data to create a topic", code=500)
        associated_ngo_id = None
        if "associated_ngo" in request.data:
            if request.data.get("associated_ngo"):
                associated_ngo_id = request.data.get("associated_ngo")
        starting_comment = StartingComment.objects.create(creator=request.user, content=description)
        creator = request.user
        request.data["creator"] = {}
        if associated_ngo_id:
            try:
                associated_ngo = Organization.objects.get(id=associated_ngo_id)
            except Exception:
                raise NotFound("associated ngo not found")
            else:
                if self.check_membership(associated_ngo, creator):
                    try:
                        topic = Topic.objects.create(
                            title=title,
                            description=starting_comment,
                            creator=associated_ngo,
                            country=country,
                            city_or_area=city_or_area,
                            address=address,
                            img=img,
                        )
                    except Exception:
                        raise APIException("Something went wrong while creating the topic")
                else:
                    raise APIException("The user is not a part of the ngo")
        else:
            try:
                topic = Topic.objects.create(
                    title=title,
                    description=starting_comment,
                    creator=creator,
                    country=country,
                    city_or_area=city_or_area,
                    address=address,
                    img=img,
                )
            except Exception:
                raise APIException("Something went wrong while creating the topic", code=500)
        if "tags" in request.data and isinstance(request.data["tags"], list):
            for tag in request.data.get("tags"):
                tag = tag.lower()
                try:
                    tag, _ = Tag.objects.get_or_create(name=tag)
                except Exception:
                    raise APIException("tag is not string or have characters greater than 25")
                else:
                    tag.topic_set.add(topic)
        return Response(self.get_serializer(topic).data)

    def retrieve(self, request, *args, **kwargs):
        topic = self.get_object()
        topic.description.views += 1
        topic.description.save()
        return super().retrieve(request, *args, **kwargs)

    def check_membership(self, ngo, user):
        if ngo.owner.id == user.id:
            return True
        elif user in ngo.members.all():
            return True
        else:
            return False

    def partial_update(self, request, *args, **kwargs):
        topic = self.get_object()
        if "description" in request.data or "title" in request.data or "img" in request.data:
            if "description" in request.data and request.data["description"]:
                topic.description.content = request.data.get("description")
                topic.description.save()
            if "title" in request.data and request.data["title"]:
                topic.title = request.data.get("title")
            img = request.data.get("img")
            topic.img = img
            topic.save()
        else:
            raise APIException("This field can not be edited")
        topic_serialized = TopicSerializer(topic).data
        return Response(topic_serialized)


class IssueViewSet(ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer


class ContributionViewSet(ModelViewSet):
    queryset = Contribution.objects.all()
    serializer_class = ContributionSerializer


class TopicIssueViewSet(ModelViewSet):
    serializer_class = IssueSerializer
    http_method_names = ["get", "post", "patch", "delete", "head"]

    def get_queryset(self):
        try:
            topic = Topic.objects.get(id=self.kwargs["topic_id"])
        except Exception:
            raise NotFound("Topic with the specified id not exists")
        else:
            issues = topic.issue_set.all()
            return issues

    def get_serializer(self, *args, **kwargs):
        if self.action == "list":
            kwargs["context"] = {"is_list": True}
        return super().get_serializer(*args, **kwargs)

    def get_permissions(self):
        if self.request.method == "PATCH" or self.request.method == "DELETE":
            self.permission_classes = (IsAuthenticated, IsOwnerOrReject)
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        try:
            topic = Topic.objects.get(id=kwargs["topic_id"])
        except Exception:
            raise APIException("topic not exists")
        try:
            title = request.data["title"]
            description = request.data["description"]
        except Exception:
            raise APIException("title and/or description is not properly specified")
        else:
            try:
                starting_description = StartingComment.objects.create(content=description, creator=request.user)
                issue = Issue.objects.create(
                    title=title, description=starting_description, creator=request.user, topic=topic
                )
            except Exception:
                raise APIException("something went wrong while saving the data")
            topic.no_of_issues += 1
            topic.save()
            if "tags" in request.data and isinstance(request.data["tags"], list):
                for tag in request.data.get("tags"):
                    tag = tag.lower()
                    try:
                        tag, _ = Tag.objects.get_or_create(name=tag)
                    except Exception:
                        raise APIException("tag is not string or have characters greater than 25")
                    else:
                        tag.issue_set.add(issue)
            if request.user in topic.contributors.all():
                contributor_obj = Contribution.objects.get(contributor=request.user, topic=topic)
                contributor_obj.no_of_contributions += 1
                contributor_obj.save()
            else:
                contributor_obj = Contribution.objects.create(
                    contributor=request.user, topic=topic, no_of_contributions=1
                )

            issue_serialized = self.get_serializer(issue).data
            return Response(issue_serialized)

    def partial_update(self, request, *args, **kwargs):
        allowed_fields = [
            "title",
            "description",
        ]  # TODO: issue update/delete tags should have a separate api link
        title = None
        description = None
        for field in request.data:
            if field == allowed_fields[0]:
                title = request.data.get(field)
            elif field == allowed_fields[1]:
                description = request.data.get(field)
            else:
                raise APIException("Some field/fields can not be edited")
        issue = self.get_object()
        if title:
            issue.title = title
        if description:
            issue.description.content = description
        try:
            issue.description.save()
            issue.save()
        except Exception:
            raise APIException("something went wrong while updating the issue.")
        issue_serialized = self.get_serializer(issue).data
        return Response(issue_serialized)


class TopicCloseApiView(UpdateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = (IsAuthenticated, IsTopicOwnerOrMemberOrReject)
    http_method_names = [
        "patch",
    ]

    def partial_update(self, request, *args, **kwargs):

        try:
            id = request.data.get("id")
            topic = Topic.objects.get(id=id)
        except Exception:
            raise NotFound("id is not given or the given id is not valid")
        self.check_object_permissions(self.request, topic)
        topic.is_closed = not topic.is_closed
        topic.closed_on = timezone.now() if topic.is_closed else None
        topic.updated_on = timezone.now()
        topic.save()
        return Response({"is_closed": topic.is_closed})


class IssueCloseApiView(UpdateAPIView):
    serializer_class = IssueSerializer
    permission_classes = (IsAuthenticated, IsIssueOwnerOrMemberOrReject)
    http_method_names = [
        "patch",
    ]

    def get_object(self):
        try:
            topic = Topic.objects.get(id=self.kwargs["topic_id"])
            issue = topic.issue_set.get(id=self.request.data.get("id"))
        except Exception:
            NotFound("topic/issue not found")
        else:
            return issue

    def partial_update(self, request, *args, **kwargs):
        issue = self.get_object()
        self.check_object_permissions(self.request, issue)
        if issue:
            issue.is_closed = not issue.is_closed
            issue.closed_on = timezone.now() if issue.is_closed else None
            issue.save()
            return Response({"is_closed": issue.is_closed})
        else:
            raise APIException("issue object not provided")


class TopicContributors(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        try:
            topic_id = self.kwargs["topic_id"]
            topic = Topic.objects.get(id=topic_id)
        except Exception:
            raise APIException("Topic not found with the specified id")
        return topic.contributors.all()


class TagAddToTopic(UpdateAPIView):
    permission_classes = (IsAuthenticated, IsTopicOwnerOrMemberOrReject)
    serializer_class = TagSerializer

    def get_object(self):
        topic_id = self.request.data.get("id")
        try:
            topic = Topic.objects.get(id=topic_id)
            self.topic = topic
        except Exception:
            raise NotFound("Either topic with the specified id not found or you not provided the id")
        else:
            return topic

    def partial_update(self, request, *args, **kwargs):
        try:
            tag_name = request.data["tag"]
        except Exception:
            raise APIException("tag is required")
        else:
            topic = self.get_object()
            self.check_object_permissions(request, topic)
            try:
                tag_name = tag_name.lower()
                tag, _ = Tag.objects.get_or_create(name=tag_name)
                tag.topic_set.add(topic)
                return Response(self.get_serializer(tag).data)
            except Exception:
                raise APIException("something went wrong while adding tag")


class TagRemoveFromTopic(TagAddToTopic):
    def partial_update(self, request, *args, **kwargs):
        try:
            tag_name = request.data["tag"]
        except Exception:
            raise APIException("tag is required")
        else:
            topic = self.get_object()
            self.check_object_permissions(request, topic)
            try:
                tag_name = tag_name.lower()
                tag = topic.tag_set.get(name=tag_name)
                topic.tag_set.remove(tag)
            except Exception:
                raise APIException("Something went wrong while remove tag")


class TagAddToIssue(UpdateAPIView):
    permission_classes = (IsAuthenticated, IsIssueOwnerOrMemberOrReject)
    serializer_class = TagSerializer

    def get_object(self):
        # topic_id = self.kwargs["topic_id"]
        issue_id = self.request.data.get("id")
        try:
            issue = Issue.objects.get(id=issue_id)
        except Exception:
            raise NotFound("Either topic with the specified id not found or you not provided the id")
        else:
            return issue

    def partial_update(self, request, *args, **kwargs):
        try:
            tag_name = request.data["tag"]
        except Exception:
            raise APIException("tag is required")
        else:
            issue = self.get_object()
            self.check_object_permissions(request, issue)
            try:
                tag_name = tag_name.lower()
                tag, _ = Tag.objects.get_or_create(name=tag_name)
                tag.issue_set.add(issue)
                return Response(self.get_serializer(tag).data)
            except Exception:
                raise APIException("something went wrong while adding tag")


class TagRemoveFromIssue(TagAddToIssue):
    def partial_update(self, request, *args, **kwargs):
        try:
            tag_name = request.data["tag"]
        except Exception:
            raise APIException("tag is required")
        else:
            issue = self.get_object()
            self.check_object_permissions(request, issue)
            try:
                tag_name = tag_name.lower()
                tag = issue.tag_set.get(name=tag_name)
                issue.tag_set.remove(tag)
            except Exception:
                raise APIException("Something went wrong while remove tag")


# TODO:
# 2. issues has their own numbering system for their respective topic
# 4. add gravatar icon to profiles
# 6. add assignees for the topic
# 7. rating system for user/ngo (NOTE: only user can rate others)
