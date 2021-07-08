from .views import ProgressReportViewSet, TaskViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"progress-reports", ProgressReportViewSet, basename="progress_reports")
router.register(r"tasks", TaskViewSet, basename="tasks")
