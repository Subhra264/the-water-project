from the_water_project.comments.models import StartingComment, IssueComment, TopicDiscussion
from the_water_project.topics.models import Issue, Topic
from the_water_project.comments.serializers import (
    StartingCommentSerializer,
    IssueCommentSerializer,
    TopicDiscussionSerializer,
)
import json
from rest_framework.renderers import JSONRenderer
from freezegun import freeze_time
from django.test import TestCase
from django.contrib.auth import get_user_model

# from unittest.mock import Mock

User = get_user_model()


@freeze_time("2021-01-01 11:12:13.000000")
class TestSerializers(TestCase):

    DATE = "2021-01-01T11:12:13Z"

    def setUp(self) -> None:
        self.user = User.objects.create(
            username="John545",
            first_name="John",
            last_name="Doe",
            email="john@email.com",
            password="Password@2020",
            country="IN",
        )
        self.description = StartingComment.objects.create(user=self.user, content="testing")
        self.topic = Topic.objects.create(title="How to start", description=self.description, creator=self.user)

    def test_starting_comment_serializers(self):
        startingSerializer = StartingCommentSerializer(self.description).data
        json_data = JSONRenderer().render(startingSerializer)
        data = {
            "id": 1,
            "user": 1,
            "content": "testing",
            "date": self.DATE,
            "likes": 0,
            "reply_to": None,
            "views": 0,
        }
        expected_json_data = json.dumps(data)
        self.assertJSONEqual(json_data, expected_json_data)

    def test_issue_comment_serializers(self):
        description = StartingComment.objects.create(user=self.user, content="anything for testing")
        issue = Issue.objects.create(creator=self.user, title="something", description=description, topic=self.topic)
        issue_comment = IssueComment.objects.create(user=self.user, content="bla bla", issue=issue)
        data = IssueCommentSerializer(issue_comment).data
        json_data = JSONRenderer().render(data)
        data = {"id": 1, "user": 1, "content": "bla bla", "likes": 0, "date": self.DATE, "reply_to": None, "issue": 1}
        expected_data = json.dumps(data)
        self.assertJSONEqual(json_data, expected_data)

    def test_topic_discussion_serializers(self):
        topic_comment = TopicDiscussion.objects.create(user=self.user, content="bla bla", topic=self.topic)
        topic_serialized_data = TopicDiscussionSerializer(topic_comment).data
        json_data = JSONRenderer().render(topic_serialized_data)
        data = {
            "user": 1,
            "id": 1,
            "content": "bla bla",
            "date": self.DATE,
            "likes": 0,
            "topic": 1,
            "reply_to": None,
        }
        expected_data = json.dumps(data)
        self.assertJSONEqual(json_data, expected_data)
