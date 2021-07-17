from django.urls.conf import path
from .views import (
    ProgressReportViewSet,
    RemoveTaskApiView,
    TaskViewSet,
    TopicProgressReportApiView,
    AddTaskApiView,
    TaskSaveChangesApiView,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"progress-reports", ProgressReportViewSet, basename="progress_reports")
router.register(r"tasks", TaskViewSet, basename="tasks")

urlpatterns = [
    path("progress-report/", TopicProgressReportApiView.as_view()),
    path("progress-report/add-task/", AddTaskApiView.as_view()),
    path("progress-report/delete-task/", RemoveTaskApiView.as_view()),
    path("tasks/save-changes/", TaskSaveChangesApiView.as_view()),
]
