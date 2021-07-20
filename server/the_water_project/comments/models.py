from django.conf import settings
from the_water_project.topics.models import Topic, Issue
from django.db import models


class Comment(models.Model):
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    reply_to = models.ForeignKey("self", on_delete=models.CASCADE, blank=True, null=True, related_name="replies")

    def __str__(self):
        return self.creator.username + "- comment_id: " + str(self.id)

    def save(self, *args, **kwargs) -> None:
        super().save(*args, **kwargs)
        try:
            self.likes
        except Exception:
            self.get_like_class().objects.create(comment=self)

    def get_like_class(self):
        pass

    class Meta:
        abstract = True


class StartingComment(Comment):
    views = models.PositiveIntegerField(default=0)

    def get_like_class(self):
        return StartingCommentLike


class TopicDiscussion(Comment):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)

    def get_like_class(self):
        return TopicCommentLike


class IssueComment(Comment):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)

    def get_like_class(self):
        return IssueCommentLike


# need to create comments for blogs also..


class CommentLike(models.Model):
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)
    no_of_likes = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return self.comment + " - Likes"

    class Meta:
        abstract = True


class TopicCommentLike(CommentLike):
    comment = models.OneToOneField(TopicDiscussion, on_delete=models.CASCADE, related_name="likes")


class IssueCommentLike(CommentLike):
    comment = models.OneToOneField(IssueComment, on_delete=models.CASCADE, related_name="likes")


class StartingCommentLike(CommentLike):
    comment = models.OneToOneField(StartingComment, on_delete=models.CASCADE, related_name="likes")
