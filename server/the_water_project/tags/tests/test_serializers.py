from rest_framework.renderers import JSONRenderer
from the_water_project.tags.models import Tag
from the_water_project.tags.serializers import TagSerializer
from django.test import TestCase
import json


class TestSerializer(TestCase):
    def test_tag_serializers(self):
        tag = Tag.objects.create(name="water")
        tag_serialized_data = TagSerializer(tag).data
        json_data = JSONRenderer().render(tag_serialized_data)
        data = {"id": 1, "name": "water"}
        expected_data = json.dumps(data)
        self.assertJSONEqual(json_data, expected_data)
