# from django.test import TestCase
# from the_water_project.blogs.models import Blog
# from the_water_project.tags.models import Tag
# from django.contrib.auth import get_user_model

# User = get_user_model()


# class TestModels(TestCase):
#     def setUp(self) -> None:
#         self.user = User.objects.create_user(
#             username="John545",
#             first_name="John",
#             last_name="Doe",
#             email="john@email.com",
#             password="Password@2020",
#             country="IN",
#         )

#     def test_blog_models(self):
#         blog1 = Blog.objects.create(user=self.user, title="testing", content="some content", _type="success_stories")
#         tag = Tag.objects.create(name="solution")
#         tag.blog_set.add(blog1)
#         self.assertEqual(blog1.user, self.user)
#         self.assertEqual(blog1.likes, 0)
#         self.assertEqual(blog1.tags.get(id=1), tag)
#         self.assertEqual(blog1._type, "success_stories")
