from django.urls.conf import path
from .views import (
    TopicViewSet,
    IssueViewSet,
    ContributionViewSet,
    TopicIssueViewSet,
    TopicCloseApiView,
    TopicContributors,
    IssueCloseApiView,
    TagAddToTopic,
    TagRemoveFromTopic,
    TagAddToIssue,
    TagRemoveFromIssue,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

urlpatterns = [
    path("close-topic/", TopicCloseApiView.as_view()),
    path("<int:topic_id>/issues/close-issue/", IssueCloseApiView.as_view()),
    path("add-tag/", TagAddToTopic.as_view()),
    path("remove-tag/", TagRemoveFromTopic.as_view()),
    path("<int:topic_id>/issues/add-tag/", TagAddToIssue.as_view()),
    path("<int:topic_id>/issues/remove-tag/", TagRemoveFromIssue.as_view()),
    path("<int:topic_id>/contributors/", TopicContributors.as_view()),
]
router.register(r"topics", TopicViewSet, basename="topics")
router.register(r"issues", IssueViewSet, basename="issues")
router.register(r"contributions", ContributionViewSet, basename="contributions")
router.register(r"topics/(?P<topic_id>[^/.]+)/issues", TopicIssueViewSet, basename="topic_issues")
