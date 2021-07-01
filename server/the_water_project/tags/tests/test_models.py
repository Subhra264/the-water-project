from the_water_project.tags.models import Tag
from django.test import TestCase
from django.db import transaction


class TestModels(TestCase):
    def test_tag_models(self):
        Tag.objects.create(name="water")
        Tag.objects.create(name="sanitation")
        self.assertEqual(Tag.objects.count(), 2)
        self.assertEqual(Tag.objects.get(id=1).name, "water")
        with transaction.atomic():
            self.assertRaises(Exception, Tag.objects.create())
