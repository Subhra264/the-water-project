from rest_framework import serializers
from .models import ProgressReport, Task
from the_water_project.users.serializers import OnlyIdAndNameUserSerializer


class TaskSerializer(serializers.ModelSerializer):
    creator = OnlyIdAndNameUserSerializer(required=False)

    class Meta:
        model = Task
        exclude = ("progress_report",)


class ProgressReportSerializer(serializers.ModelSerializer):
    task_set = TaskSerializer(Task.objects.all(), many=True)
    creator = OnlyIdAndNameUserSerializer(required=False)

    class Meta:
        model = ProgressReport
        fields = "__all__"
