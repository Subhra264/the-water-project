from django.test import TestCase
import json
from rest_framework.renderers import JSONRenderer
from freezegun import freeze_time
from the_water_project.progress_report.models import ProgressReport
from the_water_project.comments.models import StartingComment
from the_water_project.topics.models import Topic
from the_water_project.progress_report.serializers import ProgressReportSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


@freeze_time("2021-01-01 11:12:13.000000")
class TestSerializers(TestCase):

    DATE = "2021-01-01T11:12:13Z"

    def test_progress_report_serializers(self):
        user = User.objects.create_user(
            username="John545",
            first_name="John",
            last_name="Doe",
            email="john@email.com",
            password="Password@2020",
            country="IN",
        )
        description = StartingComment.objects.create(user=user, content="bla bla bla")
        topic = Topic.objects.create(title="How to start", description=description, creator=user)
        progress_report = ProgressReport.objects.create(topic=topic)
        progress_report.add_task(title="create this", description="and do this also")
        expected_data = {
            "id": 1,
            "topic": 1,
            "total_no_of_tasks": 1,
            "no_of_tasks_completed": 0,
            "is_completed": False,
            "created_on": self.DATE,
            "updated_on": self.DATE,
            "task_set": [
                {
                    "id": 1,
                    "title": "create this",
                    "description": "and do this also",
                    "date": self.DATE,
                    "is_completed": False,
                }
            ],
        }
        expected_json_data = json.dumps(expected_data)
        json_data = JSONRenderer().render(ProgressReportSerializer(progress_report).data)
        self.assertJSONEqual(json_data, expected_json_data)
        progress_report.add_task(title="hello", description="this is a hello description")
        user2 = User.objects.create(
            username="Jack545",
            first_name="Jack",
            last_name="Doe",
            email="jack@email.com",
            password="Password@2021",
            country="IN",
        )
        description2 = StartingComment.objects.create(user=user, content="bla bla bla")
        topic2 = Topic.objects.create(title="How to start", description=description2, creator=user2)
        prog_report2 = ProgressReport.objects.create(topic=topic2)
        prog_report2.add_task(title="bla bla", description="hello all")
        expected_data["task_set"] += [
            {
                "id": 2,
                "title": "hello",
                "description": "this is a hello description",
                "date": self.DATE,
                "is_completed": False,
            }
        ]
        expected_data["total_no_of_tasks"] = 2
        expected_json_data = json.dumps(expected_data)
        json_data = JSONRenderer().render(ProgressReportSerializer(progress_report).data)
        self.maxDiff = None
        self.assertJSONEqual(json_data, expected_json_data)
