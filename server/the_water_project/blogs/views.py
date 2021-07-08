from .serializers import BlogSerializer
from .models import Blog
from rest_framework.viewsets import ModelViewSet


class BlogViewSet(ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
