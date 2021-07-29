### Authentication
```
POST localhost:4000/sign-in
POST localhost:4000/sign-up
```

### Discussion
```
GET, POST localhost:8000/topics/
GET localhost:8000/topics/<topic_id>/   (filters, search functionality, pagination available)
GET, POST localhost:8000/topics/<topic_id>/issues/
localhost:8000/topics/<topic_id>/issues/<issue_id>/
localhost:8000/topics/<topic_id>/issues/<issue_id>/comments/
localhost:8000/topics/<topic_id>/issues/<issue_id>/comments/<comment_id>/
localhost:8000/topics/<topic_id>/issues/<issue_id>/comments/<comment_id>/add-remove-likes/
localhost:8000/topics/<topic_id>/comments/
localhost:8000/topics/<topic_id>/comments/<comment_id>
localhost:8000/topics/<topic_id>/comments/<comment_id>/add-remove-likes/
localhost:8000/topics/<topic_Id>/description/
localhost:8000/topics/<topic_Id>/description/add-remove-likes/
localhost:8000/topics/<topic_id>/progress-report/
localhost:8000/topics/<topic_id>/contributors/
localhost:8000/topics/<topic_id>/progress-report/add-task/
localhost:8000/topics/<topic_id>/progress-report/delete-task/
localhost:8000/topics/<topic_id>/tasks/save-changes/
localhost:8000/topics/<topic_id>/issues/close-issue/
localhost:8000/topics/close-topic/
localhost:8000/topics/add-tag/
localhost:8000/topics/remove-tag/
localhost:8000/topics/<topic_id>/issues/add-tag/
localhost:8000/topics/<topic_id>/issues/remove-tag/
localhost:8000/tags/

localhost:8000/tags/<tag_id>/
localhost:8000/user/register
localhost:8000/users/
localhost:8000/users/<user_id>/
localhost:8000/users/<user_id>/topics/
localhost:8000/ngos/<ngo_id>/topics/
localhost:8000/ngos/<ngo_id>/create-invitation-link/
localhost:8000/ngos/add-member/
localhost:8000/ngos/remove-member/
localhost:8000/ngos/
localhost:8000/ngos/<ngo_id>/


localhost:8000/contributions/
localhost:8000/contributions/<contribution_id>/
localhost:8000/issues/
localhost:8000/issues/<issue_id>/
localhost:8000/comments/starting-comments
localhost:8000/comments/starting-comments/<starting_comment_id>/
localhost:8000/comments/issue-comments/
localhost:8000/comments/issue-comments/<issue_comment_id>/
localhost:8000/comments/topic-discussions/
localhost:8000/comments/topic-discussions/<topic_discussion_id>/
localhost:8000/progress-reports/
localhost:8000/progress-reports/<progress_report_id>/
localhost:8000/tasks/
localhost:8000/tasks/<task_id>/

```

### Solutions
```
localhost:8000/blogs/
localhost:8000/blogs/su/
localhost:8000/blogs/i/
localhost:8000/blogs/a/
localhost:8000/blogs/so/
localhost:8000/blogs/p/
localhost:8000/blogs/o/
localhost:8000/blogs/<blog_id>/
localhost:8000/blogs/types-of-blogs/
localhost:8000/blogs/<blog_id>/add-remove-likes/
```