from django.test import TestCase
from the_water_project.users.models import Organization
from django.contrib.auth import get_user_model

User = get_user_model()


class TestModels(TestCase):
    def test_user_models(self):
        user1 = User.objects.create_user(
            username="John545",
            first_name="John",
            last_name="Doe",
            email="john@email.com",
            password="Password@2020",
            country="IN",
        )

        self.assertEqual(user1.age, None)
        self.assertEqual(user1.country, "IN")
        self.assertEqual(user1.address, None)
        self.assertEqual(user1.rating, 0.0)

        user1.age = 19
        user1.address = "some anonymous place"
        user1.save()

        self.assertEqual(user1.age, 19)
        self.assertEqual(user1.address, "some anonymous place")

        user2 = User.objects.create_user(
            username="jack12",
            first_name="Jack",
            last_name="Dude",
            email="jack@email.com",
            age=20,
            password="hello@394",
            country="IN",
            address="bla bla bla",
        )
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(User.objects.get(id=2), user2)

    def test_org_models(self):
        owner = User.objects.create_user(
            username="John545",
            first_name="John",
            last_name="Doe",
            email="john@email.com",
            password="Password@2020",
            country="IN",
        )
        org = Organization.objects.create_org(
            name="The NGO",
            email="ngo@email.com",
            password="org@3423",
            address="bla bla bla",
            phone_number="+919999999999",
            owner=owner,
        )

        self.assertEqual(org.owner, owner)
        self.assertEqual(org.no_of_members, 0)
        user = User.objects.create_user(
            username="Jack1345",
            first_name="Jack",
            last_name="Dude",
            email="jack@email.com",
            password="Password@2021",
            country="US",
        )
        org.add_member(user)
        self.assertEqual(org.no_of_members, 1)
        self.assertEqual(org.members.first(), user)
        org.remove_member(user)
        self.assertEqual(org.no_of_members, 0)
        self.assertEqual(org.rating, 0)
