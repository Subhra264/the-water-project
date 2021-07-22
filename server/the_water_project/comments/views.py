from the_water_project.utils.permissions import IsOwnerOrReject, IsTopicOwnerOrMemberOrReject
from rest_framework.exceptions import NotFound, APIException
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.generics import RetrieveAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.utils import timezone
from the_water_project.topics.models import Topic
from .models import StartingComment, IssueComment, TopicDiscussion
from .serializers import StartingCommentSerializer, IssueCommentSerializer, TopicDiscussionSerializer


class StartingCommentViewSet(ModelViewSet):
    queryset = StartingComment.objects.all()
    serializer_class = StartingCommentSerializer


class IssueCommentViewSet(ModelViewSet):
    queryset = IssueComment.objects.all()
    serializer_class = IssueCommentSerializer


class TopicDiscussionApiView(RetrieveAPIView, UpdateAPIView):
    serializer_class = StartingCommentSerializer
    http_method_names = ["get", "head", "patch"]  # Something has to be reviewed

    def get_object(self):
        topic_id = self.kwargs["topic_id"]
        try:
            topic = Topic.objects.get(id=topic_id)
        except ObjectDoesNotExist:
            raise NotFound("topic with the specified id not found")
        self.check_object_permissions(self.request, topic)
        return topic.description

    def get_serializer(self, *args, **kwargs):
        kwargs["context"] = {"request_user": self.request.user}
        return super().get_serializer(*args, **kwargs)

    def get_permissions(self):
        if self.request.method == "PATCH":
            self.permission_classes = (IsAuthenticated, IsTopicOwnerOrMemberOrReject)
        return super().get_permissions()

    def partial_update(self, request, *args, **kwargs):
        description = self.get_object()
        if "content" in request.data:
            if request.data.get("content"):
                description.content = request.data.get("content")
                description.save()
                if not isinstance(self, IssueDescriptionApiView):
                    description.topic.updated_on = timezone.now()
                    description.topic.save()
                return Response(self.get_serializer(description).data)
            else:
                raise APIException("content key cannot be null")
        else:
            raise APIException("content key must be provided")

    def retrieve(self, request, *args, **kwargs):
        description = self.get_object()
        description.views += 1
        description.save()
        return super().retrieve(request, *args, **kwargs)


class TopicDiscussionViewSet(ModelViewSet):
    queryset = TopicDiscussion.objects.all()
    serializer_class = TopicDiscussionSerializer


class TopicCommentsViewSet(ModelViewSet):
    serializer_class = TopicDiscussionSerializer
    http_method_names = ["get", "post", "head", "patch"]

    def get_permissions(self):
        if self.request.method == "PATCH":
            self.permission_classes = (IsAuthenticated, IsOwnerOrReject)
        return super().get_permissions()

    def get_serializer(self, *args, **kwargs):
        if self.request.method != "POST":
            kwargs["context"] = {"request_user": self.request.user}
        return super().get_serializer(*args, **kwargs)

    def get_queryset(self):
        try:
            topic = Topic.objects.get(id=self.kwargs["topic_id"])
        except Exception:
            raise NotFound("Topic with the specified id not exists")
        else:
            comments = topic.topicdiscussion_set.all()
            return comments

    def create(self, request, *args, **kwargs):
        try:
            topic = Topic.objects.get(id=kwargs["topic_id"])
            comment = None
        except ObjectDoesNotExist:
            raise NotFound("Topic with the specified is not exists")
        else:
            if "content" in request.data:
                if request.data.get("content"):
                    comment = TopicDiscussion(creator=request.user, content=request.data.get("content"), topic=topic)
                else:
                    raise APIException("'content' field can not be null")
            else:
                return APIException("You must provide 'content' key in the request body")
            if "reply_to" in request.data:
                if request.data.get("reply_to"):
                    try:
                        reply_to_comment = TopicDiscussion.objects.get(id=request.data.get("reply_to"))
                    except ObjectDoesNotExist:
                        raise NotFound("The id provided by the request is not correct.")
                    else:
                        comment.reply_to = reply_to_comment
            comment.save()
            topic.no_of_comments += 1
            topic.save()
            comment_serialized = self.get_serializer(comment).data
            return Response(comment_serialized)

    def partial_update(self, request, *args, **kwargs):
        should_pass = False
        keys = request.data.copy()
        for key in keys:
            if key == "content" and request.data["content"]:
                should_pass = True
            else:
                request.data.pop(key)
        if should_pass:
            return super().partial_update(request, *args, **kwargs)
        else:
            raise APIException("request body has some keys that can not edited", code=403)


@api_view(
    [
        "PATCH",
    ]
)
def des_add_or_remove_likes(request, **kwargs):
    topic_id = kwargs["topic_id"]
    if request.user:
        try:
            topic = Topic.objects.get(id=topic_id)
        except Exception:
            raise NotFound("the specified topic not found")
        try:
            if request.user in topic.description.likes.users.all():
                topic.description.likes.no_of_likes -= 1
                topic.description.likes.users.remove(request.user)
            else:
                topic.description.likes.no_of_likes += 1
                topic.description.likes.users.add(request.user)
            topic.description.likes.save()
            return Response(StartingCommentSerializer(topic.description, context={"request_user": request.user}).data)
        except Exception:
            raise APIException("Something went wrong while saving the data")
    else:
        raise APIException("User not signed in.")


@api_view(["PATCH"])
def issue_des_add_or_remove_likes(request, **kwargs):
    try:
        topic = Topic.objects.get(id=kwargs.get("topic_id"))
        issue = topic.issue_set.get(id=kwargs.get("issue_id"))
    except Exception:
        raise NotFound("topic/issue not found")
    else:
        try:
            description = issue.description
            if request.user in description.likes.users.all():
                description.likes.no_of_likes -= 1
                description.likes.users.remove(request.user)
            else:
                description.likes.no_of_likes += 1
                description.likes.users.add(request.user)
            description.likes.save()
            return Response(StartingCommentSerializer(description, context={"request_user": request.user}).data)
        except Exception:
            raise APIException("Something went wrong while saving the data")


class TopicIssueCommentViewSet(ModelViewSet):
    serializer_class = IssueCommentSerializer
    http_method_names = ["get", "post", "patch", "delete", "head"]

    def get_permissions(self):
        if self.request.method == "PATCH" or self.request.method == "DELETE":
            self.permission_classes = (IsAuthenticated, IsOwnerOrReject)
        return super().get_permissions()

    def get_serializer(self, *args, **kwargs):
        if self.request.method != "POST":
            kwargs["context"] = {"request_user": self.request.user}
        return super().get_serializer(*args, **kwargs)

    def get_queryset(self):
        topic_id = self.kwargs["topic_id"]
        issue_id = self.kwargs["issue_id"]
        topic = Topic.objects.get(id=topic_id)
        issue = topic.issue_set.get(id=issue_id)
        return issue.issuecomment_set.all()

    def create(self, request, *args, **kwargs):
        try:
            topic_id = self.kwargs["topic_id"]
            issue_id = self.kwargs["issue_id"]
            topic = Topic.objects.get(id=topic_id)
            issue = topic.issue_set.get(id=issue_id)
            comment = None
        except ObjectDoesNotExist:
            raise NotFound("Topic/issue with the specified is not exists")
        else:
            if "content" in request.data:
                if request.data.get("content"):
                    comment = IssueComment(creator=request.user, content=request.data.get("content"), issue=issue)
                else:
                    raise APIException("'content' field can not be null")
            else:
                raise APIException("You must provide 'content' key in the request body")
            if "reply_to" in request.data:
                if request.data.get("reply_to"):
                    try:
                        reply_to_comment = IssueComment.objects.get(id=request.data.get("reply_to"))
                    except ObjectDoesNotExist:
                        raise NotFound("The id provided by the request is not correct.")
                    else:
                        comment.reply_to = reply_to_comment
            comment.save()
            issue.no_of_comments += 1
            issue.save()
            comment_serialized = self.get_serializer(comment).data
            return Response(comment_serialized)

    def partial_update(self, request, *args, **kwargs):
        should_pass = False
        keys = request.data.copy()
        for key in keys:
            if key == "content" and request.data["content"]:
                should_pass = True
            else:
                request.data.pop(key)
        if should_pass:
            return super().partial_update(request, *args, **kwargs)
        else:
            raise APIException("content must be provided")


@api_view(
    [
        "PATCH",
    ]
)
def topic_com_add_or_remove_likes(request, **kwargs):
    topic_id = kwargs["topic_id"]
    comment_id = kwargs["comment_id"]
    if request.user:
        try:
            topic = Topic.objects.get(id=topic_id)
            comment = topic.topicdiscussion_set.get(id=comment_id)
        except Exception:
            raise NotFound("the specified topic or/and comment not found")
        try:
            if request.user in comment.likes.users.all():
                comment.likes.no_of_likes -= 1
                comment.likes.users.remove(request.user)
            else:
                comment.likes.no_of_likes += 1
                comment.likes.users.add(request.user)
            comment.likes.save()
            return Response(TopicDiscussionSerializer(comment, context={"request_user": request.user}).data)
        except Exception:
            raise APIException("Something went wrong while saving the data")
    else:
        raise APIException("User not signed in.")


@api_view(
    [
        "PATCH",
    ]
)
def issue_com_add_or_remove_likes(request, **kwargs):
    topic_id = kwargs["topic_id"]
    issue_id = kwargs["issue_id"]
    comment_id = kwargs["comment_id"]

    if request.user:
        try:
            topic = Topic.objects.get(id=topic_id)
            issue = topic.issue_set.get(id=issue_id)
            comment = issue.issuecomment_set.get(id=comment_id)
        except Exception:
            raise NotFound("the specified topic or/and issue or/and comment not found")
        try:
            if request.user in comment.likes.users.all():
                comment.likes.no_of_likes -= 1
                comment.likes.users.remove(request.user)
            else:
                comment.likes.no_of_likes += 1
                comment.likes.users.add(request.user)
            comment.likes.save()
            return Response(IssueCommentSerializer(comment, context={"request_user": request.user}).data)
        except Exception:
            raise APIException("Something went wrong while saving the data")
    else:
        raise APIException("User not signed in.")


class IssueDescriptionApiView(TopicDiscussionApiView):
    serializer_class = StartingCommentSerializer

    def get_permissions(self):
        if self.request.method == "PATCH":
            self.permission_classes = (IsAuthenticated, IsOwnerOrReject)
        return super().get_permissions()

    def get_object(self):
        try:
            topic_id = self.kwargs["topic_id"]
            issue_id = self.kwargs["issue_id"]
            topic = Topic.objects.get(id=topic_id)
            issue = topic.issue_set.get(id=issue_id)
        except Exception:
            raise NotFound("specified topic or/and issue not found")
        self.check_object_permissions(self.request, issue.description)
        return issue.description
