from the_water_project.comments.models import StartingComment
from the_water_project.users.models import Organization
from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.renderers import JSONRenderer
from the_water_project.topics.models import Topic
import json
from freezegun import freeze_time
from the_water_project.users.serializers import UserSerializer, OrgSerializer
from pytest import importorskip

importorskip("random_hello")
User = get_user_model()


@freeze_time("2021-01-01T11:12:13Z")
class TestSerializers(TestCase):

    DATE = "2021-01-01T11:12:13Z"

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.user = User.objects.create_user(
            username="John545",
            first_name="John",
            last_name="Doe",
            email="john@email.com",
            password="Password@2020",
            country="IN",
        )

    def test_user_serializers(self):
        serialized_data = UserSerializer(self.user).data
        json_data = JSONRenderer().render(serialized_data)
        expected_data = {
            "id": 1,
            "age": None,
            "address": None,
            "country": "INDIA",
            "profile_pic": None,
            "no_of_contributions": 0,
            "date_joined": self.DATE,
            "email": "john@email.com",
            "first_name": "John",
            "last_name": "Doe",
            "last_login": None,
            "rating": 0.0,
            "topics": [],
            "username": "John545",
        }
        expected_json_data = json.dumps(expected_data)
        self.assertJSONEqual(json_data, expected_json_data)
        description = StartingComment.objects.create(user=self.user, content="any thing")
        topic = Topic.objects.create(title="How to start", description=description, creator=self.user)
        self.user.topics.add(topic)
        expected_data["topics"] = [
            1,
        ]
        expected_json_data = json.dumps(expected_data)
        json_data = JSONRenderer().render(UserSerializer(self.user).data)
        self.assertJSONEqual(json_data, expected_json_data)

    def test_org_serializers(self):
        org = Organization.objects.create_org(
            name="The NGO",
            email="ngo@email.com",
            address="bla bla bla",
            phone_number="+919999999999",
            owner=self.user,
        )
        serialized_data = OrgSerializer(org).data
        json_data = JSONRenderer().render(serialized_data)
        expected_data = {
            "id": 1,
            "name": "The NGO",
            "email": "ngo@email.com",
            "address": "bla bla bla",
            "date_joined": self.DATE,
            "last_login": None,
            "owner": 1,
            "phone_number": "+919999999999",
            "rating": 0.0,
            "no_of_members": 0,
            "members": [],
            "topics": [],
        }
        expected_json_data = json.dumps(expected_data)
        self.assertJSONEqual(json_data, expected_json_data)
        description = StartingComment.objects.create(user=self.user, content="any thing")
        topic = Topic.objects.create(title="How to start", description=description, creator=self.user)
        org.topics.add(topic)
        expected_data["topics"] = [
            1,
        ]
        expected_json_data = json.dumps(expected_data)
        json_data = JSONRenderer().render(OrgSerializer(org).data)
        self.assertJSONEqual(json_data, expected_json_data)
