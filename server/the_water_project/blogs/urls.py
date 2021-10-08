from django.urls.conf import path
from .views import (
    BlogViewSet,
    types_of_blogs,
    add_or_remove_likes,
    TagAddToBlog,
    TagRemoveFromBlog,
    InnovationViewSet,
    AchievementViewSet,
    SolutionViewSet,
    ProblemViewSet,
    SuccessStoriesViewSet,
    OthersViewSet,
)
from rest_framework.routers import DefaultRouter

app_name = "blogs"

routers = DefaultRouter()

urlpatterns = [
    path("blogs/types-of-blogs/", types_of_blogs),
    path("blogs/<int:blog_id>/add-remove-likes/", add_or_remove_likes),
    path("blogs/add-tag/", TagAddToBlog.as_view(), name="blogs_add_tags"),
    path("blogs/remove-tag/", TagRemoveFromBlog.as_view(), name="blogs_remove_tags"),
]

routers.register(r"blogs/i", InnovationViewSet, basename="blogs")
routers.register(r"blogs/a", AchievementViewSet, basename="achievements")
routers.register(r"blogs/so", SolutionViewSet, basename="solutions")
routers.register(r"blogs/p", ProblemViewSet, basename="problems")
routers.register(r"blogs/su", SuccessStoriesViewSet, basename="success_stories")
routers.register(r"blogs/o", OthersViewSet, basename="others")
routers.register(r"blogs", BlogViewSet, basename="blogs")
