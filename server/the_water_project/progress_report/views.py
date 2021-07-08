from .models import ProgressReport, Task
from .serializers import ProgressReportSerializer, TaskSerializer
from rest_framework.viewsets import ModelViewSet


class ProgressReportViewSet(ModelViewSet):
    queryset = ProgressReport.objects.all()
    serializer_class = ProgressReportSerializer


class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
