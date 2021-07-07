from rest_framework import serializers
from .models import ProgressReport, Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        exclude = ("progress_report",)


class ProgressReportSerializer(serializers.ModelSerializer):
    task_set = TaskSerializer(Task.objects.all(), many=True)

    class Meta:
        model = ProgressReport
        fields = "__all__"
