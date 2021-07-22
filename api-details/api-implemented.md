# Tracking of implemented APIs
## List of available APIs

### most important APIs
```
localhost:8000/topics/
localhost:8000/topics/<topic_id>/   (filters, search functionality, pagination available)
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
```
### less important
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
            "id": 2,
            "img": null,
            "topic_details": {
                "description": {
                    "title": "First topic from my side",
                    "date": "2021-07-20T11:17:27.371268Z",
                    "brief_description": "Hello guys, let's make our earch better"
                },
                "opened_by": {
                    "org": {
                        "name": "The NGO",
                        "id": 1,
                        "profile_pic": null
                    },
                    "user": {
                        "username": "Samufa58",
                        "id": 2,
                        "profile_pic": null
                    }
                },
                "meta_data": {
                    "tags": [
                        "water pollution",
                        "water solution"
                    ],
                    "is_closed": true,
                    "no_of_issues": 1,
                    "no_of_comments": 2,
                    "upvotes": 0
                }
            }
        }
    ]
```
If you want to create a new topic, you can do this by using POST request to this api. Your request body must contain `title` and `description`. If an user is creating this topic as an org, then he/she can provide `associated_ngo` containing the id of the org. Backend will varify if the user is a part of the specified ngo or not. If not, Api will throw an error.
Successful creation will let the api send back the json of the created topic.
Example request body -
```json
{
    "title": "hello all",
    "description": "how are you?",
    "country": "IN",
    "city_or_area": "blah city",
    "address": "some dummy address",
    "associated_ngo": 2  //optional
}
```
respone data -
```json
{
    "id": 1,
    "description": {
        "id": 1,
        "likes": {
            "no_of_likes": 0,
            "user_liked": null
        },
        "creator": {
            "id": 1,
            "username": "Abhra303"
        },
        "content": "This is my first topic description",
        "date": "2021-07-20T07:50:25.613664Z",
        "views": 8,
        "reply_to": null
    },
    "date": "2021-07-20T07:50:25.922122Z",
    "is_closed": false,
    "no_of_issues": 0,
    "no_of_comments": 1,
    "progress_report": null,
    "updated_on": "2021-07-20T07:50:25.922122Z",
    "closed_on": null,
    "country": "IN",
    "city_or_area": "kolkata",
    "address": "lokhandwala street, 030377",
    "stars": 0,
    "title": "This is my first topic",
    "creator": {
        "user": {
            "id": 1,
            "username": "Abhra303"
        }
    },
    "tags": [
        {
            "id": 1,
            "name": "water pollution"
        }
    ],
    "contributors": [
        {
            "id": 1,
            "username": "Abhra303"
        },
        {
            "id": 2,
            "username": "Samufa58"
        }
    ]
}
```
The creator of the topic will automatically be a contributor of that topic.

### filters and search
You can also use filters and search functionalities.
available fields for filters are ==>
```
is_closed=True or False (case-insensitive)
country=IN (value should be valid country code)
no_of_issues=int (any valid integer)
progress_report__is_completed=bool (true or false case-insensitive)
progress_report__total_no_of_tasks=int (valid integer)
no_of_issue__gt=int (valid integer)
no_of_issue__gte=int (valid integer)
no_of_issue__lt=int (valid integer)
no_of_issue__lte=int (valid integer)
```
These fields have to be added at the end of the url. Ex-
`localhost:8000/topics/<topic_id>/?no_of_issue_gt=int&country=IN`

To search for string you have add a search param at the last of the url. Ex-
`localhost:8000/topics/<topic_id>/?search=string`

You can enable ordering. Ex -
`localhost:8000/topics/<topic_id>/?ordering=True`

To go to next page, add a `page` query in the url -
`localhost:8000/topics/<topic_id>/?page=1`

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
{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 2,
            "creator": {
                "user": {
                    "id": 2,
                    "username": "Samufa58",
                    "profile_pic": null
                }
            },
            "tags": [],
            "title": "how are you?",
            "date": "2021-07-20T12:02:39.997449Z",
            "is_closed": false,
            "closed_on": null,
            "no_of_comments": 0,
            "description": 4,
            "topic": 2
        }
    ]
}
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
    "id": 1,
    "creator": {
        "user": {
            "id": 2,
            "username": "Samufa58"
        }
    },
    "tags": [
        {
            "id": 1,
            "name": "water pollution"
        },
        {
            "id": 2,
            "name": "water solution"
        }
    ],
    "title": "First topic issue from my side",
    "date": "2021-07-20T11:30:49.527311Z",
    "is_closed": false,
    "closed_on": null,
    "no_of_comments": 0,
    "description": 3,
    "topic": 1
}

```
Creating an issue in a topic will let the creator of the issue be a contributor of that topic.
## localhost:8000/topics/<topic_id>/issues/<issue_id>/
`patch` request: Allowed keys are - `title`, `description` and `is_closed`. `is_closed` is a boolean field.
`delete` request will delete that issue.

## localhost:8000/topics/<topic_id>/comments/
returns all dicussion comments of a particular topic.
```json
{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 4,
            "likes": {
                "no_of_likes": 0,
                "user_liked": false
            },
            "creator": {
                "id": 2,
                "username": "Samufa58",
                "profile_pic": null
            },
            "content": "hello from another comment",
            "date": "2021-07-20T12:29:38.414319Z",
            "reply_to": null,
            "topic": 2
        },
        {
            "id": 5,
            "likes": {
                "no_of_likes": 0,
                "user_liked": false
            },
            "creator": {
                "id": 2,
                "username": "Samufa58",
                "profile_pic": null
            },
            "content": "hello from comments",
            "date": "2021-07-20T12:30:37.658313Z",
            "reply_to": null,
            "topic": 2
        }
    ]
}
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
    "id": 1,
    "likes": {
        "no_of_likes": 0,
        "user_liked": false
    },
    "creator": {
        "id": 1,
        "username": "Abhra303"
    },
    "content": "hello this is my first comment on a topic",
    "date": "2021-07-20T07:55:35.691765Z",
    "reply_to": null,
    "topic": 1
}
```
## localhost:8000/topics/<topic_id>/comments/<comment_id>/
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
    "id": 1,
    "likes": {
        "no_of_likes": 0,
        "user_liked": false
    },
    "creator": {
        "id": 1,
        "username": "Abhra303"
    },
    "content": "This is my first topic description",
    "date": "2021-07-20T07:50:25.613664Z",
    "views": 9,
    "reply_to": null
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
    "id": 3,
    "task_set": [
        {
            "id": 1,
            "creator": {
                "id": 2,
                "username": "Samufa58"
            },
            "title": "This is my first task",
            "description": "hello from sam",
            "date": "2021-07-20T12:46:07.869977Z",
            "is_completed": false
        }
    ],
    "creator": {
        "id": 2,
        "username": "Samufa58"
    },
    "total_no_of_tasks": 2,
    "no_of_tasks_completed": 0,
    "is_completed": false,
    "created_on": "2021-07-20T12:46:07.780977Z",
    "updated_on": "2021-07-20T14:19:46.981649Z"
}
```
## localhost:8000/topics/<topic_id>/contributors/
Returns the list of contributors of a topic.
**Accepted requests:** GET
**Note: Creation of a topic, issue, progress-report, task will increase the number of contributions to that topic**
Response data-
```json
{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 2,
            "no_of_contributions": 6,
            "username": "Samufa58",
            "rating": 0.0,
            "country": "INDIA",
            "last_login": null,
            "first_name": "Abhradeep",
            "last_name": "",
            "email": "kaak@email.com",
            "date_joined": "2021-07-20T08:25:40.169558Z",
            "profile_pic": null,
            "age": null,
            "address": null
        }
    ]
}
```
## localhost:8000/topics/<topic_id>/progress-report/add-task/
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
    "id": 3,
    "task_set": [
        {
            "id": 1,
            "creator": {
                "id": 2,
                "username": "Samufa58",
                "profile_pic": null
            },
            "title": "This is my first task",
            "description": "hello from sam",
            "date": "2021-07-20T12:46:07.869977Z",
            "is_completed": false
        }
    ],
    "creator": {
        "id": 2,
        "username": "Samufa58",
        "profile_pic": null
    },
    "total_no_of_tasks": 4,
    "no_of_tasks_completed": 0,
    "is_completed": false,
    "created_on": "2021-07-20T12:46:07.780977Z",
    "updated_on": "2021-07-22T12:14:56.081739Z"
}
```
Response while error -
```json
{
    "detail": "title or/and description is/are not defined properly",
    "status_code": 500
}
```
## localhost:8000/topics/<topic_id>/progress-report/delete-task/
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
    "success": "task has been deleted",
    "status_code": 200
}
```
## localhost:8000/topics/<topic_id>/tasks/save-changes/
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
{
    "success":"task/tasks successfully updated",
    "status_code": 200
```
## localhost:8000/topics/close-topic/
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
```json
{
    "su": [],
    "i": [],
    "o": [],
    "a": [],
    "so": [],
    "p": [],
    "popular_stories": []
}
```
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
{
    "id": 1,
    "likes": {
        "no_of_likes": 0,
        "user_liked": false
    },
    "content": "some blah blah blah blah blahb blah blah blah blah blah blah blahb  b blah b b: b b ",
    "creator": {
        "id": 2,
        "username": "Samufa58"
    },
    "tags": [],
    "title": "my first blog",
    "_type": "so",
    "no_of_comments": 0,
    "date": "2021-07-20T14:12:10.115200Z",
    "updated_on": "2021-07-20T14:12:10.115200Z",
    "views": 0
}
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


## localhost:8000/user/register/
Post request. Used to create users in the database.
Request body -
```json
{
    "username": "hala5@a",
    "password": "12345",
    "first_name": "hala",   //optional
    "last_name": "kala",    //optional
    "email": "hala@hmail.com",
    "age": 34,          //optional
    "country": "IN",
    "address": "snake island 343",   //optional
    "profile_pic": "http:bla.com/media/shj" //optional
}
```
Uploaded file for profile_pic must use `Content-type` = `multipart/formdata;`

Response body -
```json
{
    "success": "user created",
    "status_code": 201
}
```
## localhost:8000/users/

Response body - 
```json
[
    {
        "id": 1,
        "no_of_contributions": 1,
        "username": "Abhra303",
        "rating": 0.0,
        "last_login": null,
        "first_name": "",
        "last_name": "",
        "email": "",
        "date_joined": "2021-07-20T07:37:32.245395Z",
        "country": "IN",
        "age": null,
        "address": null
    }
]
```
`Post request` - not allowed
User can update only his profile. Else a permission error will be shown -
```json
{
    "detail": "You do not have permission to perform this action.",
    "status_code": 403
}
```
request body -
```json
{
    "first_name": "Abhradeep"
}
```
Response body - 
```json
{
    "id": 2,
    "no_of_contributions": 4,
    "username": "Samufa58",
    "rating": 0.0,
    "last_login": null,
    "first_name": "Abhradeep",
    "last_name": "",
    "email": "kaak@email.com",
    "date_joined": "2021-07-20T08:25:40.169558Z",
    "country": "IN",
    "age": null,
    "address": null
}
```
## localhost:8000/ngos/

To create -
Post method : request body -
```json
{
    "name": "the commit",
    "email": "ereck@email.com",
    "phone_number": "+919999992933",
    "address": "lokhandwala 93y97"
}
```
If you want to send `profile_pic`, the `Content-type` must be `multipart/formdata;`

Response body for get requests -
```json
[
    {
        "id": 1,
        "owner": {
            "id": 2,
            "username": "Samufa58"
        },
        "members": [],
        "date_joined": "2021-07-20T10:12:04.779604Z",
        "rating": 0.0,
        "no_of_members": 0,
        "name": "The NGO",
        "email": "ngo@email.com",
        "address": "kaka 3-3-8008",
        "phone_number": "+9199999999999"
    }
]
```

## localhost:8000/ngos/<ngo_id>/create-invitation-link/
No request body should be present. Its a post request.
Response body -
```json
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MjY4NzUzNTl9.Nq6ZzNb2WXLydgfTHG4xj327n5kE4eAvNST8EaVsyXw"
}
```
Only owner or members of that ngo can generate this token.

## localhost:8000/ngos/add-member/
Patch request - 
request body -
```json
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MjY4NzUzNTl9.Nq6ZzNb2WXLydgfTHG4xj327n5kE4eAvNST8EaVsyXw"
}
```

Owner or already member can not request. It will give permission error -
```json
{
    "detail": "owner can not add himself to member list",
    "status_code": 500
}
```
else:
```json
{
    "success": "User successfully added to member",
    "status_code": 200,
    "ngo_id": 2
}
```
## localhost:8000/ngos/remove-member/
delete request.
Request body -
```json
{
    "ngo_id": 1,
    "user_id": 1
}
```
If the user is the owner or not in the member list, it will return error code.
```json
{
    "detail": "User is already not a part of the NGO",
    "status_code": 500
}
```
else:
```json
{"success": "User successfully removed", "status_code": 200}
```