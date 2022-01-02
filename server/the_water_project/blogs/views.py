from django.utils import timezone
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from the_water_project.utils.permissions import IsOwnerOrReject
from rest_framework.exceptions import APIException
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import BlogSerializer
from the_water_project.tags.models import Tag
import json
from .models import Blog, BLOG_CHOICES
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from the_water_project.utils.tags import TagAddOrRemoveObject


class BlogViewSet(ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    http_method_names = ["get", "post", "patch", "delete", "head"]
    parser_classes = (JSONParser, FormParser, MultiPartParser)

    def get_serializer(self, *args, **kwargs):
        if self.action == "list":
            kwargs["context"] = {"is_list": True}
        else:
            kwargs["context"] = {"request_user": self.request.user}
        return super().get_serializer(*args, **kwargs)

    def get_permissions(self):
        if self.request.method == "PATCH" or self.request.method == "DELETE":
            self.permission_classes = (IsAuthenticated, IsOwnerOrReject)
        return super().get_permissions()

    def list(self, request, *args, **kwargs):
        shown_list = {}
        for name, _ in BLOG_CHOICES:
            blogs = Blog.objects.filter(_type=name).order_by("-date")[:10]
            shown_list[name] = [self.get_serializer(blog).data for blog in blogs]
        popular_stories = list(Blog.objects.all().order_by("-views")[:10])
        shown_list["popular_stories"] = [self.get_serializer(blog).data for blog in popular_stories]
        return Response(shown_list)

    def create(self, request, *args, **kwargs):
        try:
            title = request.data["title"]
            content = request.data["content"]
            type = request.data["type"]
            front_img = request.data.get("front_img")
        except Exception:
            raise APIException("You must specify title, content and type to create a blog")
        try:
            blog = Blog.objects.create(
                title=title, content=content, _type=type, creator=request.user, front_img=front_img
            )
            if "tags" in request.data:
                tags = json.loads(request.data["tags"])
                if isinstance(tags, list):
                    for tag_name in tags:
                        tag_name = tag_name.lower()
                        tag, _ = Tag.objects.get_or_create(name=tag_name)
                        tag.blog_set.add(blog)
        except Exception:
            raise APIException("something went wrong while creating the blog")
        blog_serialized = self.get_serializer(blog).data
        return Response(blog_serialized)

    def partial_update(self, request, *args, **kwargs):
        should_pass = False
        blog = self.get_object()
        keys = request.data.copy()
        try:
            for key in keys:
                if key == "title" and request.data["title"]:
                    blog.title = request.data["title"]
                    should_pass = True
                elif key == "content" and request.data["content"]:
                    blog.content = request.data["content"]
                    should_pass = True
                elif key == "type" and request.data["type"]:
                    blog._type = request.data["type"]
                    should_pass = True
                elif key == "front_img" and request.data["front_img"]:
                    blog.front_img = request.data["front_img"]
                    should_pass = True
                else:
                    request.data.pop(key)
            if should_pass:
                blog.updated_on = timezone.now()
                blog.save()
                return Response(self.get_serializer(blog).data)
            else:
                raise APIException("There is no editable fields that you provided")
        except APIException as e:
            raise e
        except Exception:
            raise APIException("Something went wrong while saving the data")

    def retrieve(self, request, *args, **kwargs):
        blog = self.get_object()
        blog.views += 1
        blog.save()
        return super().retrieve(request, *args, **kwargs)


@api_view(
    [
        "GET",
    ]
)
def types_of_blogs(request):
    types = {"no_of_types": 0, "types": []}
    for _, type in BLOG_CHOICES:
        types["types"].append(type)
        types["no_of_types"] += 1
    return Response(types)


@api_view(
    [
        "PATCH",
    ]
)
def add_or_remove_likes(request, **kwargs):
    if request.user:
        blog_id = kwargs["blog_id"]
        try:
            blog = Blog.objects.get(id=blog_id)
            if request.user in blog.likes.users.all():
                blog.likes.no_of_likes -= 1
                blog.likes.users.remove(request.user)
            else:
                blog.likes.users.add(request.user)
                blog.likes.no_of_likes += 1
            blog.likes.save()
        except Exception:
            raise APIException("Something went wrong while saving the data")
        return Response(BlogSerializer(blog, context={"request_user": request.user}).data)
    else:
        raise APIException("The user not signed in.")


class TypeOfBlogsViewSet(ModelViewSet):
    serializer_class = BlogSerializer
    http_method_names = [
        "get",
    ]

    def get_serializer(self, *args, **kwargs):
        if self.action == "list":
            kwargs["context"] = {"is_list": True}
        return super().get_serializer(*args, **kwargs)

    def get_queryset(self):
        blogs = Blog.objects.filter(_type=self._type)
        return blogs


class InnovationViewSet(TypeOfBlogsViewSet):
    _type = "i"


class SuccessStoriesViewSet(TypeOfBlogsViewSet):
    _type = "su"


class AchievementViewSet(TypeOfBlogsViewSet):
    _type = "a"


class SolutionViewSet(TypeOfBlogsViewSet):
    _type = "so"


class ProblemViewSet(TypeOfBlogsViewSet):
    _type = "p"


class OthersViewSet(TypeOfBlogsViewSet):
    _type = "o"


class TagAddToBlog(TagAddOrRemoveObject):
    model_class = Blog
    permission_classes = (IsAuthenticated, IsOwnerOrReject)


class TagRemoveFromBlog(TagAddToBlog):
    remove_tag = True
