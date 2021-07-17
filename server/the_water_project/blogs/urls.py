from django.urls.conf import path
from .views import (
    BlogViewSet,
    types_of_blogs,
    add_or_remove_likes,
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
]

routers.register(r"blogs/innovations", InnovationViewSet, basename="blogs")
routers.register(r"blogs/achievment", AchievementViewSet, basename="achievements")
routers.register(r"blogs/solutions", SolutionViewSet, basename="solutions")
routers.register(r"blogs/problems", ProblemViewSet, basename="problems")
routers.register(r"blogs/success-stories", SuccessStoriesViewSet, basename="success_stories")
routers.register(r"blogs/others", OthersViewSet, basename="others")
routers.register(r"blogs", BlogViewSet, basename="blogs")
