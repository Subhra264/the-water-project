from rest_framework.exceptions import APIException
from rest_framework.response import Response
from .serializers import BlogSerializer
from .models import Blog, BLOG_CHOICES
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view


class BlogViewSet(ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def get_serializer(self, *args, **kwargs):
        if self.action == "list":
            kwargs["context"] = {"is_list": True}
        return super().get_serializer(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        if request.user:
            try:
                title = request.data.get("title")
                content = request.data.get("content")
                type = request.data.get("type")
            except Exception:
                raise APIException("You must specify title, content and type to create a blog")
            try:
                blog = Blog.objects.create(title=title, content=content, _type=type, user=request.user)
            except Exception as e:
                raise e
                # raise APIException("something went wrong while creating the blog")
            blog_serialized = self.get_serializer(blog).data
            return Response(blog_serialized)
        else:
            raise APIException("User not signed in.")

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
        return Response(BlogSerializer(blog).data)
    else:
        raise APIException("The user not signed in.")
