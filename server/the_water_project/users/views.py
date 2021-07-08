from .models import Organization
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, OrgSerializer
from rest_framework.viewsets import ModelViewSet

User = get_user_model()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class OrgViewSet(ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrgSerializer
