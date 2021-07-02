from django.conf import settings
from the_water_project.topics.models import Topic, Issue
from django.db import models


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    likes = models.PositiveIntegerField(default=0)
    reply_to = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null=True, related_name="replies")

    def __str__(self):
        return self.user + "- comment_id: " + self.id

    class Meta:
        abstract = True


class StartingComment(Comment):
    views = models.PositiveIntegerField(default=0)


class TopicDiscussion(Comment):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)


class IssueComment(Comment):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)


# need to create comments for blogs also..
