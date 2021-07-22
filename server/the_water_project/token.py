from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({"username": self.user.username})
        data.update({"id": self.user.id})
        if self.user.orgs.count():
            owned_orgs = [org.id for org in self.user.orgs.all()]
        else:
            owned_orgs = []
        if self.user.member_of_orgs.count():
            membered_orgs = [org.id for org in self.user.member_of_orgs.all()]
        else:
            membered_orgs = []
        data.update({"owned_orgs": owned_orgs})
        data.update({"membered_orgs": membered_orgs})
        return data


class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer
