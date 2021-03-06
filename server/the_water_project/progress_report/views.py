from the_water_project.utils.permissions import IsTopicOwnerOrMemberOrReject
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from the_water_project.topics.models import Contribution
from rest_framework.exceptions import APIException, NotFound
from rest_framework.generics import CreateAPIView, DestroyAPIView, RetrieveAPIView, UpdateAPIView
from rest_framework.response import Response
from .models import ProgressReport, Task
from the_water_project.topics.models import Topic
from .serializers import ProgressReportSerializer, TaskSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework import status


class ProgressReportViewSet(ModelViewSet):
    queryset = ProgressReport.objects.all()
    serializer_class = ProgressReportSerializer


class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TopicProgressReportApiView(RetrieveAPIView, CreateAPIView):
    serializer_class = ProgressReportSerializer
    http_method_names = ["get", "post", "head"]

    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = (IsAuthenticated, IsTopicOwnerOrMemberOrReject)
        return super().get_permissions()

    def get_object(self):
        try:
            topic = Topic.objects.get(id=self.kwargs["topic_id"])
        except Exception:
            raise NotFound("topic with the specified id not found")
        return topic.progress_report

    def retrieve(self, request, *args, **kwargs):
        if self.get_object():
            return super().retrieve(request, *args, **kwargs)
        else:
            return Response({})

    def create(self, request, *args, **kwargs):
        try:
            topic = Topic.objects.get(id=self.kwargs["topic_id"])
        except Exception:
            raise NotFound("topic with specified id not found")
        else:
            if topic.progress_report:
                raise APIException("progress report already created")
            else:
                self.check_object_permissions(request, topic)
                progress_report = ProgressReport.objects.create(creator=request.user)
                task_title = (
                    request.data.get("title") if request.data.get("title") and "title" in request.data else None
                )
                task_description = (
                    request.data.get("description")
                    if request.data.get("description") and "description" in request.data
                    else None
                )
                try:
                    progress_report.add_task(title=task_title, description=task_description, creator=request.user)
                except Exception:
                    raise APIException("Something went wrong while saving progress report")
                topic.progress_report = progress_report
                topic.updated_on = timezone.now()
                topic.save()
                if request.user in topic.contributors.all():
                    contributor = Contribution.objects.get(contributor=request.user, topic=topic)
                    contributor.no_of_contributions += 1
                    contributor.save()
                else:
                    Contribution.objects.create(contributor=request.user, topic=topic, no_of_contributions=1)
                return Response(self.get_serializer(progress_report).data)


class AddTaskApiView(CreateAPIView):
    serializer_class = ProgressReportSerializer
    permission_classes = (IsAuthenticated, IsTopicOwnerOrMemberOrReject)

    def get_queryset(self):
        topic_id = self.kwargs["topic_id"]
        try:
            topic = Topic.objects.get(id=topic_id)
        except Exception:
            raise NotFound("topic with the specified id not found")
        return topic.progress_report.task_set.all()

    def create(self, request, *args, **kwargs):
        topic_id = self.kwargs["topic_id"]
        try:
            topic = Topic.objects.get(id=topic_id)
        except Exception:
            raise NotFound("topic with specified id not founc")
        self.check_object_permissions(request, topic)
        try:
            title = request.data["title"]
            description = request.data["description"]
        except Exception:
            raise APIException("title or/and description is/are not defined properly")
        if topic.progress_report:
            try:
                topic.progress_report.add_task(title=title, description=description, creator=request.user)
            except Exception as e:
                raise APIException(e)
            topic.updated_on = timezone.now()
            topic.save()
            if request.user in topic.contributors.all():
                contributor = Contribution.objects.get(contributor=request.user, topic=topic)
                contributor.no_of_contributions += 1
                contributor.save()
            else:
                Contribution.objects.create(contributor=request.user, topic=topic, no_of_contributions=1)
            return Response(self.get_serializer(topic.progress_report).data)
        else:
            raise NotFound("progress report is not created yet. Create it first")


class RemoveTaskApiView(DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated, IsTopicOwnerOrMemberOrReject)

    def get_queryset(self):
        topic_id = self.kwargs["topic_id"]
        try:
            topic = Topic.objects.get(id=topic_id)
        except Exception:
            raise NotFound("topic with the specified id not found")
        return topic.progress_report.task_set.all()

    def destroy(self, request, *args, **kwargs):
        topic_id = self.kwargs["topic_id"]
        try:
            topic = Topic.objects.get(id=topic_id)
        except Exception:
            raise NotFound("topic with the specified id not found")
        self.check_object_permissions(request, topic)
        if topic.progress_report:
            try:
                id = request.data.get("id")
                topic.progress_report.remove_task(id=id)
                topic.updated_on = timezone.now()
                topic.save()
                return Response({"success": "task has been deleted", "status_code": status.HTTP_200_OK})
            except Exception:
                raise APIException("task object not found")
        else:
            raise NotFound("Progress report is not created yet.")


class TaskSaveChangesApiView(UpdateAPIView):
    serializer_class = TaskSerializer
    http_method_names = [
        "patch",
    ]
    permission_classes = (IsAuthenticated, IsTopicOwnerOrMemberOrReject)

    def get_queryset(self):
        topic_id = self.kwargs["topic_id"]
        try:
            topic = Topic.objects.get(id=topic_id)
        except Exception:
            raise NotFound("topic with the specified id not found")
        self.check_object_permissions(self.request, topic)
        return topic.progress_report.task_set.all()

    def partial_update(self, request, *args, **kwargs):
        tasks = self.get_queryset()
        topic = tasks.first().progress_report.topic
        try:
            ids = self.request.data.get("ids")
            for id in ids:
                task = tasks.get(id=id)
                task.mark_complete_or_incomplete()
                if task.is_completed:
                    if request.user in topic.contributors.all():
                        contribution = Contribution.objects.get(contributor=request.user, topic=topic)
                        contribution.no_of_contributions += 1
                        contribution.save()
                    else:
                        Contribution.objects.create(contributor=request.user, topic=topic, no_of_contributions=1)
            topic.updated_on = timezone.now()
            topic.save()
        except Exception:
            raise APIException("Something went wrong while saving the task/tasks.")
        return Response(
            {"success": "task/tasks successfully updated", "status_code": status.HTTP_200_OK}, status=status.HTTP_200_OK
        )
