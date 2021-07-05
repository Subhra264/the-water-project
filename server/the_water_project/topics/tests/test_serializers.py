import json
from the_water_project.users.models import Organization
from django.test import TestCase
from rest_framework.renderers import JSONRenderer
from the_water_project.topics.models import Topic, Issue
from the_water_project.topics.serializers import TopicSerializer, IssueSerializer
from the_water_project.comments.models import StartingComment
from django.contrib.auth import get_user_model
from freezegun import freeze_time

User = get_user_model()


@freeze_time("2021-01-01T11:12:13Z")
class TestSerializers(TestCase):

    DATE = "2021-01-01T11:12:13Z"

    def setUp(self) -> None:
        self.user = User.objects.create_user(
            username="John545",
            first_name="John",
            last_name="Doe",
            email="john@email.com",
            password="Password@2020",
            country="IN",
        )
        self.description1 = StartingComment.objects.create(user=self.user, content="any thing")
        self.topic = Topic.objects.create(title="How to start", description=self.description1, creator=self.user)

    def test_topic_serializers(self):

        serialized_data = TopicSerializer(self.topic).data
        json_data = JSONRenderer().render(serialized_data)
        expected_data = {
            "id": 1,
            "creator": {"user": 1},
            "date": self.DATE,
            "description": 1,
            "is_closed": False,
            "no_of_issues": 0,
            "stars": 0,
            "title": "How to start",
        }
        expected_json_data = json.dumps(expected_data)
        self.assertJSONEqual(json_data, expected_json_data)
        org = Organization.objects.create(
            name="The NGO",
            email="ngo@email.com",
            password="org@3423",
            address="bla bla bla",
            phone_number="+919999999999",
            owner=self.user,
        )
        self.topic.creator = org
        self.topic.save()
        expected_data["creator"] = {"org": 1}
        expected_json_data = json.dumps(expected_data)
        json_data = JSONRenderer().render(TopicSerializer(self.topic).data)
        self.assertJSONEqual(json_data, expected_json_data)

    def test_issue_serializers(self):
        issue = Issue.objects.create(
            creator=self.user, title="can not do this", description=self.description1, topic=self.topic
        )
        serialized_data = IssueSerializer(issue).data
        json_data = JSONRenderer().render(serialized_data)
        expected_data = {
            "id": 1,
            "title": "can not do this",
            "date": self.DATE,
            "is_closed": False,
            "no_of_comments": 0,
            "creator": 1,
            "description": 1,
            "topic": 1,
            "tags": [],
        }
        expected_json_data = json.dumps(expected_data)
        self.assertJSONEqual(json_data, expected_json_data)
        # with transaction.atomic():
        #     self.assertRaises(Exception, issue.creator = self.topic)
