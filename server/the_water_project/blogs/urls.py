from django.urls.conf import path
from .views import BlogViewSet, types_of_blogs, add_or_remove_likes
from rest_framework.routers import DefaultRouter

app_name = "blogs"

routers = DefaultRouter()

routers.register(r"blogs", BlogViewSet, basename="blogs")

urlpatterns = [
    path("blogs/types-of-blogs/", types_of_blogs),
    path("blogs/<int:blog_id>/add-remove-likes/", add_or_remove_likes),
]
