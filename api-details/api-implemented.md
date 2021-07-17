# Tracking of implemented APIs
## List of available APIs

### most important APIs
```
localhost:8000/topics/
localhost:8000/topics/<topic_id>/
localhost:8000/topics/<topic_id>/issues/
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
localhost:8000/topics/<topic_id>/progress-report/add-task
localhost:8000/topics/<topic_id>/progress-report/delete-task
localhost:8000/topics/<topic_id>/tasks/save-changes
localhost:8000/topics/<topic_id>/issues/close-topic/
localhost:8000/topics/close-topic
localhost:8000/tags/
localhost:8000/tags/<tag_id>/
```
### less important
```
localhost:8000/blogs/
localhost:8000/blogs/success-stories/
localhost:8000/blogs/innovations/
localhost:8000/blogs/achievment/
localhost:8000/blogs/solutions/
localhost:8000/blogs/problems/
localhost:8000/blogs/others/
localhost:8000/blogs/<blog_id>/
localhost:8000/blogs/types-of-blogs/
localhost:8000/blogs/<blog_id>/add-remove-likes/
localhost:8000/users/
localhost:8000/users/<user_id>/
localhost:8000/orgs/
localhost:8000/orgs/<org_id>/
```
### No use till now
```
localhost:8000/contributions/
localhost:8000/contributions/<contribution_id>/
localhost:8000/issues/
localhost:8000/issues/<issue_id>/
localhost:8000/comments/starting-comments
localhost:8000/comments/starting-comments/<stariting_comment_id>/
localhost:8000/comments/issue-comments/
localhost:8000/comments/issue-comments/<issue_comment_id>/
localhost:8000/comments/topic-discussions/
localhost:8000/comments/topic-discussions/<topic_discussion_id>/
localhost:8000/progress-reports/
localhost:8000/progress-reports/<progress_report_id>/
localhost:8000/tasks/
localhost:8000/tasks/<task_id>/
```

## details of each APIs

### localhost:8000/topics/

This api provides all the topics created so far. Sorted on the basis of id (till now).

**Allowed requests**: GET, POST

When using `GET`, it provide response json containing all topics - 
```json
{
    "topics": [
        {
            "id": 1,
            "img": null,
            "topic-details": {
                "result-description-container": {
                    "result-description": {
                        "result-title": "Water level is increasing day by day",
                        "result-date": "2021-07-08T10:17:13.933625Z",
                        "result-brief-description": "A topic is created"
                    },
                    "result-opened-by": {
                        "org": null,
                        "user": {
                            "username": "riter79",
                            "profile-pic": null
                        }
                    }
                },
                "result-meta-data": {
                    "tags": [],
                    "is-closed": false,
                    "no-of-issues": 0,
                    "upvotes": 0
                }
            }
        }
    ]
}
```
If you want to create a new topic, you can do this by using POST request to this api. Your request body must contain `title` and `description`. If an user is creating this topic as an org, then he/she can provide `associated_ngo` containing the id of the org. Backend will varify if the user is a part of the specified ngo or not. If not, Api will throw an error.
Successful creation will let the api send back the json of the created topic.
Example request body -
```json
{
    "title": "hello all",
    "description": "how are you?",
    "associated_ngo": 2  //optional
}
```
respone data -
```json
{
    "id": 8,
    "description": {
        "id": 17,
        "content": "how are you?",
        "date": "2021-07-15T05:28:54.050762Z",
        "likes": 0,
        "views": 0,
        "user": 3,
        "reply_to": null
    },
    "date": "2021-07-15T05:28:54.277952Z",
    "is_closed": false,
    "no_of_issues": 0,
    "progress_report": null,
    "stars": 0,
    "title": "hello all",
    "creator": {
        "org": {
            "id": 2,
            "topics": [
                5,
                6,
                7,
                8
            ],
            "last_login": null,
            "name": "Google",
            "email": "google@email.com",
            "address": "an address",
            "phone_number": "+913334444433",
            "no_of_members": 1,
            "date_joined": "2021-07-10T10:01:42.645443Z",
            "rating": 0.0,
            "owner": 1,
            "members": [
                3
            ]
        }
    },
    "tags": [],
    "contributors": [
        1
    ]
}
```
The creator of the topic will automatically be a contributor of that topic.

## localhost:8000/topics/<topic_id>/
Used to retreive, update and delete the topic
**Accepted request**: GET, PATCH, DELETE
Sending a `GET` request to this api will provide a json response of that particular id specified in the url. If the id is not a valid id then this will throw an error.
Response body is same as the json response shown in the last example.
**Note: You can only use `patch` to update the topic**
You can only update the title and description with this API url. To update title of a specific topic, you can provide a `title` key in the response body and send it via `PATCH` request. Updating description can also be done by providing the `description` key. You can provide both.
You can delete the specific topic with the `DELETE` request.

## localhost:8000/topics/<topic_id>/issues/
Lists all the issues of a particular topic. `POST` request with a valid request body will create an issue of that topic.
**Accepted requests**: GET, POST
Response body when using `GET`:
```json
[
    {
        "id": 1,
        "title": "how to do that",
        "date": "2021-07-13T04:34:33.978025Z",
        "is_closed": false,
        "no_of_comments": 0,
        "creator": 3,
        "description": 15,
        "topic": 3,
        "tags": []
    },
    {
        "id": 2,
        "title": "generating my first issue",
        "date": "2021-07-13T04:43:21.172668Z",
        "is_closed": false,
        "no_of_comments": 0,
        "creator": 3,
        "description": 16,
        "topic": 3,
        "tags": [
            2
        ]
    }
]
```
`title` and `description` keys are must while creating a new issue via `POST` request. You can optionally provide `tags` key to add tags. `tags` must be an array containg all the names of tags.
Example request body:
```json
{
    "title": "hello all",
    "description": "how are you?",
    "tags": ["water sanitation", "water pollution"]  //optional
}
```
response body-
```json
{
    "id": 4,
    "title": "hello all",
    "date": "2021-07-15T06:21:09.691080Z",
    "is_closed": false,
    "no_of_comments": 0,
    "creator": 3,
    "description": 19,
    "topic": 2,
    "tags": [
        5,
        6
    ]
}
```
Creating an issue in a topic will let the creator of the issue be a contributor of that topic.
## localhost:8000/topics/<topic_id>/issues/<issue_id>/
`patch` request: Allowed keys are - `title`, `description` and `is_closed`. `is_closed` is a boolean field.
`delete` request will delete that issue.

## localhost:8000/topics/<topic_id>/comments/
returns all dicussion comments of a particular topic.
```json
[
    {
        "id": 1,
        "content": "hello I would like to contribute here. Can anyone blah blah please guide me?",
        "date": "2021-07-11T10:04:15.229372Z",
        "likes": 2,
        "user": 3,
        "reply_to": null,
        "topic": 3
    }
]
```
**Accepted requests:** GET, POST
To create a comment, Provide a request body with `content` key. You can optionally provide the `reply_to` key containing the id of another comment.
Example request body -
```json
{
    "content": "How can you justify it",
    "reply_to": 1
}
```
Response data -
```json
{
    "id": 2,
    "content": "How can you justify it",
    "date": "2021-07-15T06:42:24.939277Z",
    "likes": 0,
    "user": 3,
    "reply_to": 1,
    "topic": 3
}
```
## localhost:8000/topics/<topic_id>/comments/<comment_id>
Returns a specific comment of a topic.
Allowed keys for `PATCH` request are - `content`, `likes`. `DELETE` and `PUT` not allowed.

## localhost:8000/topics/<topic_Id>/description/
Returns description of a topic.
**Accepted requests:** GET, PATCH
`PATCH` request can have only `content` key to update. Nothing else will be accepted.
request body -
```json
{
    "content": "How can crack it. It is the hardest problem in the world"
}
```
Response body -
```json
{
    "id": 8,
    "content": "How can crack it. It is the hardest problem in the world",
    "date": "2021-07-10T09:50:49.942418Z",
    "likes": 0,
    "user": 1,
    "reply_to": null,
    "topic": 3
}
```
## localhost:8000/topics/<topic_id>/progress-report/
Returns the report of a particular topic
**Accepted requests:** GET, POST
You can create a progress-report by sending POST request with data in the request body. To create a progress-report you must provide `title` and `description` keys so that the progress report can create a task to start with. Else, it will return a json error detail with a status code 500.
If the topic has a progress-report already then you can't create another progress-report. It will return status code 500
request data -
```json
{
    "title": "The task is nothing",
    "description": "passing the task to anyone else"
}
```
Response body -
```json
{
    "id": 6,
    "task_set": [
        {
            "id": 9,
            "title": "The task is nothing",
            "description": "passing the task to anyone else",
            "date": "2021-07-15T07:49:45.417578Z",
            "is_completed": false
        }
    ],
    "total_no_of_tasks": 1,
    "no_of_tasks_completed": 0,
    "is_completed": false,
    "created_on": "2021-07-15T07:49:45.243998Z",
    "updated_on": "2021-07-15T07:49:45.552557Z"
}
```
## localhost:8000/topics/<topic_id>/contributors/
Returns the list of contributors of a topic.
**Accepted requests:** GET
**Note: Creation of a topic, issue, progress-report, task will increase the number of contributions to that topic**
Response data-
```json
[
    {
        "id": 3,
        "topics": [],
        "last_login": null,
        "username": "Samufo58",
        "first_name": "Sam",
        "last_name": "doe",
        "email": "same@email.com",
        "date_joined": "2021-07-08T10:25:11.089009Z",
        "country": "IN",
        "age": null,
        "address": null,
        "rating": 0.0
    }
]
```
## localhost:8000/topics/<topic_id>/progress-report/add-task
Adds a task to the progress-report of a topic.
**Accepted requests:** POST
The request body must contain `title` and `description` keys. If the title and description are valid then it returns a json object containing the id of created task. Else it will give error code.
Request body - 
```json
{
    "title": "The task is nothing",
    "description": "passing the task to anyone else"
}
```
Response body -
```json
{
    "id": 6,
    "task_set": [
        {
            "id": 9,
            "title": "The task is nothing",
            "description": "passing the task to anyone else",
            "date": "2021-07-15T07:49:45.417578Z",
            "is_completed": false
        }
    ],
    "total_no_of_tasks": 1,
    "no_of_tasks_completed": 0,
    "is_completed": false,
    "created_on": "2021-07-15T07:49:45.243998Z",
    "updated_on": "2021-07-15T07:49:45.552557Z"
}
```
## localhost:8000/topics/<topic_id>/progress-report/delete-task
Deletes the specified task/tasks
**Accepted Requests:** DELETE
To delete a specific task, put the id of that task in `id` key in the request body.
Request body -
```json
{
    "id": 9
}
```
Response body -
```json
{
    "success": "task has been deleted"
}
```
## localhost:8000/topics/<topic_id>/tasks/save-changes
It is used to save `is_closed` data for one or multiple task at once.
**Accepted Request:** PATCH
Provide a key named "ids" in the request body and put the ids of those tasks in that key as an array.
Example request body -
```json
{
    "ids": [6,8]
}
```
Response body -
```json
"task/tasks successfully updated"
```
## localhost:8000/topics/close-topic
Closes or Opens the topic specified in the request body. If the topic is already closed then sending request to this api will open the topic again else close the topic.
**Accepted Request:**  PATCH
Request body -
```json
{
    "id": 1
}
```
Response body -
```json
{
    "is_closed": true
}
```
## localhost:8000/tags/
Returns a list of all tags.
**Accepted Requests:** GET, POST
Response body -
```json
[
    {
        "id": 1,
        "name": "Water Sanitation"
    },
    {
        "id": 2,
        "name": "Testing"
    }

]
```
You can create a tag by providing a `name` key in the request body and sending a POST request.
request body -
```json
{
    "name": "water sanitatin"
}
```
Response body -
```json
{
        "id": 3,
        "name": "water sanitation"
}
```
## localhost:8000/tags/<tag_id>/
Used for retrieve, update and delete specific tags.
**Accepted Requests:** GET, PUT, PATCH, DELETE

## localhost:8000/blogs/
Returns list of all blogs/solutions.
**Accepted Requests:** GET, POST
You must provide `title`, `content` and `type` keys in order to create a blog.
Request body -
```json
{
    "type": "su",
    "title": "created it for blog liking",
    "content": "blog is working"
}
```
Response body -
```json
[
    {
        "id": 5,
        "likes": {
            "no_of_likes": 2
        },
        "title": "created it for blog liking",
        "content": "blog's like is working",
        "_type": "su",
        "no_of_comments": 0,
        "date": "2021-07-15T12:57:51.688287Z",
        "updated_on": "2021-07-15T13:01:29.533178Z",
        "user": 3,
        "tags": []
    }
]
```

## localhost:8000/blogs/types-of-blogs/
lists the possible types of blogs
**Accepted requests:** GET
Response body -
```json
{
    "no_of_types": 6,
    "types": [
        "Success_stories",
        "Innovation",
        "Others",
        "Achievment",
        "Solution",
        "Problem"
    ]
}
```
## localhost:8000/blogs/<blog_id>/add-remove-likes/
User can use this api to like a blog. It can be also used to undo a like. Returns json data of that particular blog.
**Accepted Request:** PATCH
