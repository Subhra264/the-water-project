from django.utils import timezone
from rest_framework.generics import ListAPIView, UpdateAPIView
from the_water_project.tags.models import Tag
from the_water_project.users.models import Organization
from django.contrib.auth import get_user_model
from the_water_project.users.serializers import UserSerializer
from .models import Topic, Issue, Contribution
from rest_framework.exceptions import NotFound, APIException
from the_water_project.comments.models import StartingComment
from .serializers import TopicSerializer, IssueSerializer, ContributionSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

# from rest_framework.authentication import BaseAuthentication
# from rest_framework.permissions import AllowAny


class TopicViewSet(ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    # authentication_classes = [BaseAuthentication,]
    # permission_classes = [AllowAny,]

    def get_serializer(self, *args, **kwargs):
        if self.action == "list":
            kwargs["context"] = {"is_list": True}
        return super().get_serializer(*args, **kwargs)

    def list(self, request, *args, **kwargs):
        listed_data = {"topics": []}
        queryset = self.get_queryset()
        for instance in queryset:
            serialized_instance = self.get_serializer(instance)
            data = serialized_instance.data
            instance_data = {
                "id": data["id"],
                "img": None,
                "topic-details": {
                    "result-description-container": {
                        "result-description": {
                            "result-title": data["title"],
                            "result-date": data["date"],
                            "result-brief-description": data["description"]["content"],
                        },
                        "result-opened-by": {
                            "org": None,
                            "user": None,
                        },
                    },
                    "result-meta-data": {
                        "tags": [],
                        "is-closed": data["is_closed"],
                        "no-of-issues": data["no_of_issues"],
                        "upvotes": data["stars"],
                    },
                },
            }
            if data["tags"]:
                instance_data["topic-details"]["result-meta-data"]["tags"] = [tag["name"] for tag in data["tags"]]
            instance_data["topic-details"]["result-description-container"]["result-opened-by"]["user"] = {
                "username": data["description"]["user"]["username"],
                "id": data["description"]["user"]["id"],
                "profile-pic": None,
            }
            if "org" in data["creator"]:
                instance_data["topic-details"]["result-description-container"]["result-opened-by"]["org"] = {
                    "name": data["creator"]["org"]["name"],
                    "id": data["creator"]["org"]["id"],
                    "profile-pic": None,
                }

            listed_data["topics"].append(instance_data)
        return Response(listed_data)

    def create(self, request, *args, **kwargs):
        if request.user:
            try:
                title = request["title"]
                description = request["description"]
                country = request["country"]
                city_or_area = request["city_or_area"]
                address = request["address"]
            except Exception:
                raise APIException("You didn't provide essential data to create a topic", code=500)
            associated_ngo_id = None
            if "associated_ngo" in request.data:
                if request.data.get("associated_ngo"):
                    associated_ngo_id = request.data.get("associated_ngo")
            starting_comment = StartingComment.objects.create(user=request.user, content=description)
            creator = request.user
            request.data["creator"] = {}
            if associated_ngo_id:
                try:
                    associated_ngo = Organization.objects.get(id=associated_ngo_id)
                except Exception as e:
                    return e
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
                            )
                        except Exception:
                            raise APIException("Something went wrong while creating the topic")
                    else:
                        raise ValueError("The user is not the part of the ngo")
            else:
                try:
                    topic = Topic.objects.create(
                        title=title,
                        description=starting_comment,
                        creator=creator,
                        country=country,
                        city_or_area=city_or_area,
                        address=address,
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
        return super().create(request, *args, **kwargs)

    def check_membership(self, ngo, user):
        if ngo.owner.id == user.id:
            return True
        elif user in ngo.members.all():
            return True
        else:
            return False

    def update(self, request, *args, **kwargs):
        topic = self.get_object()
        if "description" in request.data or "title" in request.data:
            if "description" in request.data and request.data["description"]:
                topic.description.content = request.data.get("description")
                topic.description.save()
            if "title" in request.data and request.data["title"]:
                topic.title = request.data.get("title")
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
                starting_description = StartingComment.objects.create(content=description, user=request.user)
                issue = Issue.objects.create(
                    title=title, description=starting_description, creator=request.user, topic=topic
                )
            except Exception:
                raise APIException("something went wrong while saving the data")
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
            "is_closed",
            "description",
        ]  # TODO: issue update/delete tags should have a separate api link
        title = None
        description = None
        is_closed = None
        for field in request.data:
            if field == allowed_fields[0]:
                title = request.data.get(field)
            elif field == allowed_fields[1]:
                is_closed = request.data.get(field)
            elif field == allowed_fields[2]:
                description = request.data.get(field)
            else:
                raise APIException("Some field/fields can not be edited")
        issue = self.get_object()
        if title:
            issue.title = title
        if description:
            issue.description = description
        if isinstance(is_closed, bool):
            issue.is_closed = is_closed
        try:
            issue.save()
        except Exception:
            raise APIException("something went wrong while updating the issue.")
        issue_serialized = self.get_serializer(issue).data
        return Response(issue_serialized)


class TopicCloseApiView(UpdateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    http_method_names = [
        "patch",
    ]

    def partial_update(self, request, *args, **kwargs):
        try:
            id = request.data.get("id")
            topic = Topic.objects.get(id=id)
        except Exception:
            raise NotFound("id is not given or the given id is not valid")
        # if topic.is_closed:
        #     topic.is_closed = False
        # else:
        #     topic.is_closed = True
        topic.is_closed = not topic.is_closed
        topic.closed_on = timezone.now() if topic.is_closed else None
        topic.updated_on = timezone.now()
        topic.save()
        return Response({"is_closed": topic.is_closed})


class IssueCloseApiView(UpdateAPIView):
    serializer_class = IssueSerializer
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


# TODO:
# 2. issues has their own numbering system for their respective topic
# 3. add media to the api
# 4. add gravatar icon to profiles
# 5. Have to add search functionality
# 6. add assignees for the topic
# 7. rating system for user/ngo (NOTE: only user can rate others)
# 8. Have to add authentication and permissions to this
# 9. use of django-signals and JWT
