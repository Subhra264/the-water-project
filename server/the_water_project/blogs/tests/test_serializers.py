# from django.test import TestCase
# from freezegun import freeze_time
# from the_water_project.blogs.serializers import BlogSerializer
# from rest_framework.renderers import JSONRenderer
# from the_water_project.blogs.models import Blog
# from django.contrib.auth import get_user_model
# import json

# User = get_user_model()


# @freeze_time("2021-01-01T11:12:13Z")
# class TestSerializers(TestCase):
#     def test_blog_models(self):
#         user = User.objects.create(
#             username="John545",
#             first_name="John",
#             last_name="Doe",
#             email="john@email.com",
#             password="Password@2020",
#             country="IN",
#         )
#         blog = Blog.objects.create(user=user, title="testing", content="some content", _type="success_stories")
#         blog_serialized_data = BlogSerializer(blog).data
#         json_data = JSONRenderer().render(blog_serialized_data)
#         data = {
#             "user": 1,
#             "id": 1,
#             "title": "testing",
#             "content": "some content",
#             "_type": "success_stories",
#             "likes": 0,
#             "no_of_comments": 0,
#             "date": "2021-01-01T11:12:13Z",
#             "tags": [],
#         }
#         expected_json_data = json.dumps(data)
#         self.assertJSONEqual(json_data, expected_json_data)
