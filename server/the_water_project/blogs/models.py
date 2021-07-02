from django.db import models
from django.conf import settings
from the_water_project.tags.models import Tag


BLOG_CHOICES = [
    ("su", "Success_stories"),
    ("i", "Innovation"),
    ("o", "Others"),
    ("a", "Achievment"),
    ("so", "Solution"),
    ("p", "Problem"),
]


class Blog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField()
    _type = models.CharField(choices=BLOG_CHOICES, max_length=30)
    likes = models.PositiveIntegerField(default=0)
    no_of_comments = models.PositiveIntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag, blank=True)
    # TODO: should we add location too?

    def __str__(self):
        return "Blog - " + self.title
