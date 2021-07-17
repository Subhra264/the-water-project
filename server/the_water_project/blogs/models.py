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
    no_of_comments = models.PositiveIntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    tags = models.ManyToManyField(Tag, blank=True)
    views = models.PositiveBigIntegerField(default=0)

    def __str__(self):
        return "Blog - " + self.title

    def save(self, *args, **kwargs) -> None:
        super().save(*args, **kwargs)
        try:
            self.likes
        except Exception:
            Like.objects.create(blog=self)
        return self


class Like(models.Model):
    blog = models.OneToOneField(Blog, on_delete=models.CASCADE, related_name="likes")
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)
    no_of_likes = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return self.blog + " - likes"
