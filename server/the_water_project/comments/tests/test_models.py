# from the_water_project.comments.models import StartingComment, TopicDiscussion, IssueComment
# from the_water_project.topics.models import Topic, Issue
# from django.contrib.auth import get_user_model
# from the_water_project.users.models import Organization
# from django.test import TestCase
# from django.db import transaction

# User = get_user_model()


# class TestModels(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(
#             username="John545",
#             first_name="John",
#             last_name="Doe",
#             email="john@email.com",
#             password="Password@2020",
#             country="IN",
#         )
#         self.org = Organization.objects.create_org(
#             name="The NGO",
#             email="ngo@email.com",
#             password="org@3423",
#             address="bla bla bla",
#             phone_number="+919999999999",
#             owner=self.user,
#         )
#         self.description = StartingComment.objects.create(user=self.user, content="hello starting")
#         self.topic = Topic.objects.create(title="How to start", description=self.description, creator=self.org)

#     def test_starting_comment_models(self):
#         starting_comment = self.description
#         self.assertEqual(0, starting_comment.views)
#         starting_comment.views = 15
#         starting_comment.save()
#         self.assertEqual(15, starting_comment.views)

#     def test_topic_discussion_models(self):
#         comment = TopicDiscussion.objects.create(user=self.user, content="hello all...", topic=self.topic)
#         reply_comment = TopicDiscussion.objects.create(
#             user=self.user, content="replying..", topic=self.topic, reply_to=comment
#         )
#         self.assertEqual(TopicDiscussion.objects.count(), 2)
#         self.assertEqual(comment.user, self.user)
#         self.assertEqual(comment.topic, self.topic)
#         self.assertEqual(comment.likes, 0)
#         self.assertEqual(comment.replies.first(), reply_comment)
#         with transaction.atomic():
#             topic = TopicDiscussion(user=self.user, content="some", topic=None)
#             self.assertRaises(BaseException, topic.save)
#             topic = TopicDiscussion(content="some", topic=self.topic)
#             self.assertRaises(BaseException, topic.save)

#     def test_issue_discussion_models(self):
#         issue = Issue.objects.create(
#             creator=self.user, title="something", description=self.description, topic=self.topic
#         )
#         comment = IssueComment.objects.create(user=self.user, content="one issue here", issue=issue)
#         reply_comment = IssueComment.objects.create(user=self.user, content="replying", issue=issue, reply_to=comment)

#         self.assertEqual(comment.content, "one issue here")
#         self.assertEqual(comment.likes, 0)
#         self.assertEqual(comment.replies.first(), reply_comment)
