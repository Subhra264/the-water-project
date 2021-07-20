from django.conf import settings
from django.utils import timezone
import jwt
import datetime
from the_water_project.utils.permissions import IsOwnerOrMemberOrReject, IsOwnerOrSelf, IsSelfOrReject
from rest_framework import status
from rest_framework.exceptions import APIException, NotFound
from rest_framework.response import Response
from rest_framework.views import APIView
from the_water_project.topics.serializers import TopicSerializer
from rest_framework.generics import ListAPIView
from .models import Organization
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from .serializers import ReadOnlyOrgSerializer, RegisterUserSerializer, UserSerializer, OrgSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.utils import datetime_to_epoch

User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    http_method_names = ["get", "patch", "delete", "head"]
    permission_classes = (IsAuthenticatedOrReadOnly, IsSelfOrReject)


class OrgViewSet(ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrgSerializer
    http_method_names = ["get", "post", "patch", "delete", "head"]

    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = (IsAuthenticated,)
        elif self.request.method == "PATCH" or self.request.method == "DELETE":
            self.permission_classes = (IsAuthenticated, IsOwnerOrMemberOrReject)
        else:
            self.permission_classes = (IsAuthenticatedOrReadOnly,)
        return super().get_permissions()

    def get_serializer_class(self):
        if self.request.method == "PATCH":
            return ReadOnlyOrgSerializer
        else:
            return OrgSerializer


class UserRelatedTopicApiView(ListAPIView):
    serializer_class = TopicSerializer

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        try:
            user = User.objects.get(id=user_id)
            topics = user.topic_set.all()
        except Exception:
            raise NotFound("could not fetch topic data for the specified user")
        else:
            return topics

    def get_serializer(self, *args, **kwargs):
        kwargs["context"] = {"is_list": True}
        return super().get_serializer(*args, **kwargs)


class NgoRelatedTopicApiView(ListAPIView):
    serializer_class = TopicSerializer

    def get_queryset(self):
        try:
            ngo = Organization.objects.get(id=self.kwargs["ngo_id"])
            topics = ngo.topics.all()
        except Exception:
            raise NotFound("Ngo id was not correct.")
        else:
            return topics

    def get_serializer(self, *args, **kwargs):
        kwargs["context"] = {"is_list": True}
        return super().get_serializer(*args, **kwargs)


class RegisterUserApiView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        new_user_serializer = RegisterUserSerializer(data=request.data)
        if new_user_serializer.is_valid():
            new_user = new_user_serializer.save()
            if new_user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(new_user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateInvitation(APIView):
    permission_classes = [IsAuthenticated, IsOwnerOrMemberOrReject]

    def get_object(self):
        try:
            ngo = Organization.objects.get(id=self.kwargs["ngo_id"])
        except Exception:
            raise NotFound("The ngo with the specified id not found")
        else:
            self.ngo = ngo
        return ngo

    def post(self, request, ngo_id):  # noqe
        token = jwt.encode(
            {"user_id": self.ngo.id, "exp": datetime_to_epoch(timezone.now() + datetime.timedelta(days=1))},
            settings.SECRET_KEY,
        )
        return Response({"access_token": str(token)})


class AddNgoMember(APIView):
    permission_classes = (IsAuthenticated,)

    def patch(self, request):
        try:
            access_token = request.data["access_token"]
            decoded_token = jwt.decode(
                access_token,
                key=settings.SECRET_KEY,
                algorithms=["HS256"],
            )
            ngo_id = decoded_token["user_id"]
        except Exception:
            raise APIException("token is expired or you didn't provide the token", code=403)
        else:
            try:
                ngo = Organization.objects.get(id=ngo_id)
            except Exception as e:
                raise e
            else:
                if request.user == ngo.owner:
                    raise APIException("owner can not add himself to member list")
                elif request.user in ngo.members.all():
                    raise APIException("You are already a part of this organization")
                ngo.add_member(request.user)
                return Response(
                    {"success": "User successfully added to member", "status_code": status.HTTP_200_OK},
                    status=status.HTTP_202_ACCEPTED,
                )


class RemoveMember(APIView):
    permission_classes = (IsAuthenticated, IsOwnerOrSelf)

    def get_ngo_and_user(self):
        try:
            ngo_id = self.request.data["ngo_id"]
            user_id = self.request.data["user_id"]
        except Exception:
            raise APIException("ngo id or/and user_id not provided")
        else:
            try:
                self.ngo = Organization.objects.get(id=ngo_id)
                self.user = User.objects.get(id=user_id)
                return (self.ngo, self.user)
            except Exception:
                raise APIException("ngo or/and user not found")

    def delete(self, request):
        if self.user == self.ngo.owner:
            raise APIException("Owner can not get out of a NGO. Delete the NGO instead")
        elif self.user in self.ngo.members.all():
            self.ngo.remove_member(self.user)
            return Response({"success": "User successfully removed", "status_code": status.HTTP_200_OK})
        else:
            raise APIException("User is already not a part of the NGO")
