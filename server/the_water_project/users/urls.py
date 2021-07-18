from django.urls.conf import path
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, OrgViewSet, UserRelatedTopicApiView, NgoRelatedTopicApiView

router = DefaultRouter()

urlpatterns = [
    path("ngos/<int:ngo_id>/topics/", NgoRelatedTopicApiView.as_view(), name="ngo_related_topic"),
    path("users/<int:user_id>/topics/", UserRelatedTopicApiView.as_view(), name="user_related_topic"),
]


router.register(r"users", UserViewSet, basename="users")
router.register(r"ngos", OrgViewSet, basename="orgs")
