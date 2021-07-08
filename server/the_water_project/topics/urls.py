from .views import TopicViewSet, IssueViewSet, ContributionViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"topics", TopicViewSet, basename="topics")
router.register(r"issues", IssueViewSet, basename="issues")
router.register(r"contributions", ContributionViewSet, basename="contributions")
