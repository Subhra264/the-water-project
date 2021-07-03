from the_water_project.tags.models import Tag
from django.test import TestCase


class TestModels(TestCase):
    def test_tag_models(self):
        Tag.objects.create(name="water")
        Tag.objects.create(name="sanitation")
        self.assertEqual(Tag.objects.count(), 2)
        self.assertEqual(Tag.objects.get(id=1).name, "water")
