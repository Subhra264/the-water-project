from django.contrib.auth import get_user_model
from rest_framework import permissions
from the_water_project.users.models import Organization
from rest_framework.permissions import BasePermission


class IsOwnerOrMemberOrReject(BasePermission):
    message = "The user do not have permission to do it"

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        print("this is getting called", view)
        ngo = view.get_object()
        if request.user == ngo.owner or request.user in ngo.members.all():
            return True
        else:
            return False


class IsTopicOwnerOrMemberOrReject(BasePermission):
    message = "The user do not have permission to do it"

    def has_object_permission(self, request, view, obj):
        member = False
        if request.method in permissions.SAFE_METHODS:
            return True
        if isinstance(obj.creator, Organization):
            print(obj.creator, " is the creator")
            if request.user == obj.creator.owner or request.user in obj.creator.members.all():
                member = True
        elif request.user == obj.creator:
            member = True
        if member:
            return True
        else:
            return False


class IsIssueOwnerOrMemberOrReject(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user == obj.creator:
            return True
        elif isinstance(obj.topic.creator, Organization):
            if request.user == obj.topic.creator.owner or request.user in obj.topic.creator.members.all():
                return True
        elif request.user == obj.topic.creator:
            return True
        return False


class IsOwnerOrReject(BasePermission):
    message = "User can not update or delete this issue"

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user == obj.creator:
            return True
        else:
            return False


class IsOwnerOrSelf(BasePermission):
    def has_permission(self, request, view):
        ngo, user = view.get_ngo_and_user()
        if request.user == user or request.user == ngo.owner:
            return True
        else:
            return False


class IsSelfOrReject(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if isinstance(obj, get_user_model()):
            return request.user == obj
        return False
