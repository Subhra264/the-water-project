from rest_framework.routers import DefaultRouter
from .views import StartingCommentViewSet, IssueCommentViewSet, TopicDiscussionViewSet


router = DefaultRouter()

router.register(r"comments/starting-comments", StartingCommentViewSet, basename="starting_comment")
router.register(r"comments/issue-comments", IssueCommentViewSet, basename="issue_comments")
router.register(r"comments/topic-discussions", TopicDiscussionViewSet, basename="topic_discussions")
