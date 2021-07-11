### Authentication
```
POST localhost:4000/sign-in
POST localhost:4000/sign-up
```

### Discussion
```
GET localhost:4000/discussion/topics/
POST locahost:4000/discussion/topics

GET localhost:4000/discussion/topic/description?topicId=234fasdfwrhfaerh
GET localhost:4000/discussion/topic/issues?topicId=234fasdfwrhfaerh
GET localhost:4000/discussion/topic/progress-report?topicId=234fasdfwrhfaerh
GET localhost:4000/discussion/topic/comments?topicId=234fasdfwrhfaerh

PUT localhost:4000/discussion/topic/close-topic
POST localhost:4000/discussion/topic/comment

POST localhost:4000/discussion/topic/issues
PUT localhost:4000/discussion/topic/issues/save-changes

GET locahost:4000/discussion/users?username=john12
GET localhost:4000/discussion/ngos?ngo=mozilla

```

### Solutions
```
GET localhost:4000/solutions
```