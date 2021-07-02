from django.contrib import admin
from .models import StartingComment, TopicDiscussion, IssueComment

admin.site.register(StartingComment)
admin.site.register(TopicDiscussion)
admin.site.register(IssueComment)
