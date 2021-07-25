from .views import TagViewSet, TagRelatedTopicsApiView, TagRelatedIssuesApiView
from django.urls import path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

urlpatterns = [
    path("tags/<int:tag_id>/topics/", TagRelatedTopicsApiView.as_view(), name="tag_related_topics"),
    path("tags/<int:tag_id>/issues/", TagRelatedIssuesApiView.as_view(), name="tag_related_issues"),
]

router.register(r"tags", TagViewSet, basename="tags")
