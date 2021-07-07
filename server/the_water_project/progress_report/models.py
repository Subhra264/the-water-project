from django.db import models
from the_water_project.topics.models import Topic

# Create your models here.


class ProgressReport(models.Model):
    topic = models.OneToOneField(Topic, on_delete=models.CASCADE)
    total_no_of_tasks = models.PositiveIntegerField(default=0)
    no_of_tasks_completed = models.PositiveIntegerField(default=0)
    is_completed = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.topic.title + " - Progress Report"

    def add_task(self, title, description):
        if title and description:
            try:
                task = Task.objects.create(progress_report=self, title=title, description=description)
            except Exception as e:
                raise e
            else:
                self.total_no_of_tasks += 1
                self.save()
                return task

    def remove_task(self, id: int):
        try:
            task = Task.objects.get(id=id)
        except Exception as e:
            raise e
        else:
            was_completed = task.is_completed
            task.delete()
            self.total_no_of_tasks -= 1
            if was_completed:
                self.no_of_tasks_completed -= 1
            self.save()


class Task(models.Model):
    progress_report = models.ForeignKey(ProgressReport, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title + " - Task"
