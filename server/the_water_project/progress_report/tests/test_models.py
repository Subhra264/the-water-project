# from the_water_project.comments.models import StartingComment
# from django.test import TestCase
# from the_water_project.progress_report.models import ProgressReport, Task
# from the_water_project.topics.models import Topic
# from django.contrib.auth import get_user_model

# User = get_user_model()


# class TestModels(TestCase):
#     def setUp(self) -> None:
#         self.user = User.objects.create_user(
#             username="John545",
#             first_name="John",
#             last_name="Doe",
#             email="john@email.com",
#             password="Password@2020",
#             country="IN",
#         )
#         description = StartingComment.objects.create(user=self.user, content="bla bla bla")
#         self.topic = Topic.objects.create(title="How to start", description=description, creator=self.user)
#         self.progress_report = ProgressReport.objects.create(topic=self.topic)

#     def test_progress_report_models(self):
#         self.assertEqual(self.progress_report.no_of_tasks_completed, 0)
#         self.assertEqual(self.progress_report.total_no_of_tasks, 0)
#         self.assertEqual(self.progress_report.is_completed, False)
#         self.progress_report.add_task(title="create this", description="you have create this")
#         self.assertEqual(self.progress_report.total_no_of_tasks, 1)
#         self.assertEqual(self.progress_report.task_set.first().title, "create this")
#         self.progress_report.remove_task(id=1)
#         self.assertEqual(self.progress_report.total_no_of_tasks, 0)
#         self.assertEqual(self.progress_report.no_of_tasks_completed, 0)
#         self.progress_report.total_no_of_tasks = 5
#         self.progress_report.no_of_tasks_completed = 4
#         self.progress_report.save()
#         self.assertEqual(self.progress_report.total_no_of_tasks, 5)
#         self.assertEqual(self.progress_report.no_of_tasks_completed, 4)
#         # self.progress_report.no_of_tasks_completed = 5
#         # self.progress_report.save()
#         # self.assertEqual(self.progress_report.is_completed, True)
#         # the value of no_of_tasks_completed field must be less than the value of total_no_of_tasks field.
#         # However this would be validated in the views level.

#     def test_tasks_models(self):
#         task1 = Task.objects.create(
#             progress_report=self.progress_report, title="create this", description="you have to create that"
#         )
#         Task.objects.create(
#             progress_report=self.progress_report, title="create this also", description="You have to do that"
#         )
#         self.assertEqual(self.progress_report.task_set.count(), 2)
#         self.assertEqual(task1.is_completed, False)
