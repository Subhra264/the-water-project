from django.db import models

# Create your models here.


class ProgressReport(models.Model):
    total_no_of_tasks = models.PositiveIntegerField(default=0)
    no_of_tasks_completed = models.PositiveIntegerField(default=0)
    is_completed = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return "Progress Report " + str(self.id)

    def has_tasks_been_completed(self):
        return self.total_no_of_tasks == self.no_of_tasks_completed

    def add_task(self, title, description):
        if title and description:
            try:
                task = Task.objects.create(progress_report=self, title=title, description=description)
            except Exception as e:
                raise e
            else:
                self.total_no_of_tasks += 1
                if self.is_completed:
                    self.is_completed = False
                self.save()
                return task
        else:
            raise Exception("title and/or description are/is not provided")

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
            if self.has_tasks_been_completed():
                self.is_completed = True
            self.save()


class Task(models.Model):
    progress_report = models.ForeignKey(ProgressReport, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title + " - Task"

    def mark_complete_or_incomplete(self):
        try:
            self.is_completed = not self.is_completed
            self.save()
            if self.is_completed:
                self.progress_report.no_of_tasks_completed += 1
            else:
                self.progress_report.no_of_tasks_completed -= 1
            if self.progress_report.has_tasks_been_completed():
                self.progress_report.is_completed = True
            else:
                self.progress_report.is_completed = False
            self.progress_report.save()
        except Exception:
            raise Exception("did not provide boolean values")
