# from the_water_project.comments.models import StartingComment
# from the_water_project.topics.models import Topic, Issue, Contribution
# from the_water_project.users.models import Organization
# from the_water_project.tags.models import Tag
# from django.contrib.auth import get_user_model
# from django.test import TestCase
# from django.db import transaction

# User = get_user_model()


# class TestModels(TestCase):
#     @classmethod
#     def setUpTestData(cls) -> None:
#         super().setUpTestData()
#         cls.user = User.objects.create_user(
#             username="John545",
#             first_name="John",
#             last_name="Doe",
#             email="john@email.com",
#             password="Password@2020",
#             country="IN",
#         )
#         cls.owner = User.objects.create_user(
#             username="Jack1245",
#             first_name="Jack",
#             last_name="Dude",
#             email="jack@email.com",
#             password="Password@2021",
#             country="US",
#         )
#         cls.org = Organization.objects.create_org(
#             name="The NGO",
#             email="ngo@email.com",
#             password="org@3423",
#             address="bla bla bla",
#             phone_number="+919999999999",
#             owner=cls.owner,
#         )
#         cls.description1 = StartingComment.objects.create(user=cls.owner, content="bla bla bla")
#         cls.description2 = StartingComment.objects.create(user=cls.user, content="bla bla bla...")
#         cls.topic = Topic.objects.create(title="How to start", description=cls.description1, creator=cls.org)

#     def test_topic_models(self):
#         topic2 = Topic.objects.create(title="So how to start?", description=self.description2, creator=self.user)
#         tag = Tag.objects.create(name="water")
#         tag.topic_set.add(topic2)
#         self.assertEqual(topic2.tags.get(id=1), tag)
#         topic2.tags.add(Tag.objects.create(name="sanitation"))
#         self.assertEqual(topic2.tags.count(), 2)
#         self.assertEqual(self.topic.stars, 0)
#         self.assertEqual(self.topic.is_closed, False)
#         self.assertEqual(self.topic.no_of_issues, 0)
#         self.assertEqual(self.topic.description, self.description1)
#         self.assertEqual(self.topic.title, "How to start")
#         self.assertEqual(topic2.tags.get(id=2).name, "sanitation")
#         self.assertEqual(Topic.objects.count(), 2)
#         self.assertEqual(topic2.creator, self.user)
#         self.assertEqual(self.user.topics.first(), topic2)
#         self.assertEqual(topic2, Topic.objects.get(users__id=self.user.id))
#         with transaction.atomic():
#             tag = Tag.objects.create(name="greeting")
#             description = StartingComment.objects.create(user=self.owner, content="bla bla bla....")
#             topic = Topic(title="hello", description=description, creator=tag)
#             self.assertRaises(Exception, topic.save)
#             topic = Topic(creator=self.user)
#             self.assertRaises(Exception, topic.save)
#             topic = Topic(title="So How to start")
#             self.assertRaises(Exception, topic.save)
#             self.assertRaises(Exception, Topic().save)

#     def test_issue_models(self):
#         issue1 = Issue.objects.create(
#             creator=self.user, title="can not do this", description=self.description1, topic=self.topic
#         )
#         # should the description be shared by both issue and topic or not?
#         self.assertEqual(issue1.no_of_comments, 0)
#         self.assertEqual(issue1.is_closed, False)
#         self.assertEqual(issue1.description, self.description1)

#     def test_contribution_models(self):
#         contribution = Contribution.objects.create(contributor=self.user, topic=self.topic)
#         self.assertEqual(self.topic.contributors.first(), contribution.contributor)
#         self.assertEqual(self.topic.contributors.get(id=2), self.owner)
#         self.assertEqual(self.topic.contributors.count(), 2)
#         self.assertEqual(contribution.no_of_contributions, 0)
#         contribution.no_of_contributions = 15
#         contribution.save()
#         self.assertEqual(contribution.no_of_contributions, 15)
#         with self.assertRaises(Exception):
#             contribution.no_of_contributions = -1
#             contribution.save()
