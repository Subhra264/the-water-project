from django.urls.conf import path
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet,
    OrgViewSet,
    UserRelatedTopicApiView,
    NgoRelatedTopicApiView,
    RegisterUserApiView,
    CreateInvitation,
    AddNgoMember,
    RemoveMember,
)

router = DefaultRouter()

urlpatterns = [
    path("ngos/<int:ngo_id>/topics/", NgoRelatedTopicApiView.as_view(), name="ngo_related_topic"),
    path("ngos/<int:ngo_id>/create-invitation-link/", CreateInvitation.as_view(), name="invitation_for_ngo"),
    path("ngos/add-member/", AddNgoMember.as_view(), name="add_member_to_ngo"),
    path("ngos/remove-member/", RemoveMember.as_view(), name="remove_member_to_ngo"),
    path("users/<int:user_id>/topics/", UserRelatedTopicApiView.as_view(), name="user_related_topic"),
    path("user/register/", RegisterUserApiView.as_view(), name="register_user"),
]


router.register(r"users", UserViewSet, basename="users")
router.register(r"ngos", OrgViewSet, basename="orgs")
