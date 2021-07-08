from rest_framework.routers import DefaultRouter
from .views import UserViewSet, OrgViewSet

router = DefaultRouter()

router.register(r"users", UserViewSet, basename="users")
router.register(r"orgs", OrgViewSet, basename="orgs")
