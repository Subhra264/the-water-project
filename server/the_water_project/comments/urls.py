from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import (
    StartingCommentViewSet,
    IssueCommentViewSet,
    TopicDiscussionViewSet,
    TopicDiscussionApiView,
    TopicCommentsViewSet,
    TopicIssueCommentViewSet,
    des_add_or_remove_likes,
    topic_com_add_or_remove_likes,
    issue_com_add_or_remove_likes,
    IssueDescriptionApiView,
)


router = DefaultRouter()

router.register(r"comments/starting-comments", StartingCommentViewSet, basename="starting_comment")
router.register(r"comments/issue-comments", IssueCommentViewSet, basename="issue_comments")
router.register(r"comments/topic-discussions", TopicDiscussionViewSet, basename="topic_discussions")
router.register(r"topics/(?P<topic_id>[^/.]+)/comments", TopicCommentsViewSet, basename="topic_comments")
router.register(
    r"topics/(?P<topic_id>[^/.]+)/issues/(?P<issue_id>[^/.]+)/comments",
    TopicIssueCommentViewSet,
    basename="topic_issue_comments",
)

urlpatterns = [
    path("description/", TopicDiscussionApiView.as_view(), name="topic_description"),
    path("description/add-remove-likes", des_add_or_remove_likes, name="likes_for_description"),
    path("comments/<int:comment_id>/add-remove-likes", topic_com_add_or_remove_likes),
    path("issues/<int:issue_id>/comments/<int:comment_id>/add-remove-likes", issue_com_add_or_remove_likes),
    path("issues/<int:issue_id>/description/", IssueDescriptionApiView.as_view()),
]
