from rest_framework import serializers
from .models import Organization
from django.conf import settings
from the_water_project.utils.serializers import CloudinaryImageField
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    no_of_contributions = serializers.SerializerMethodField()
    username = serializers.CharField(read_only=True)
    rating = serializers.FloatField(read_only=True)
    country = serializers.SerializerMethodField()
    profile_pic = CloudinaryImageField(source='profile_pic')

    def get_no_of_contributions(self, obj):
        return obj.get_no_of_contributions()

    def get_country(self, obj):
        return obj.get_country_display()

    class Meta:
        model = User
        exclude = ["password", "is_staff", "is_active", "is_superuser", "user_permissions", "groups"]


class OnlyIdAndNameUserSerializer(serializers.ModelSerializer):
    profile_pic = CloudinaryImageField(source='profile_pic')
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "profile_pic",
        )


class OwnerField(serializers.RelatedField):
    def to_representation(self, value):
        return OnlyIdAndNameUserSerializer(value).data


class ReadOnlyOrgSerializer(serializers.ModelSerializer):
    profile_pic = serializers.SerializerMethodField()
    class Meta:
        model = Organization
        fields = ("address", "phone_number", "profile_pic")

    def get_profile_pic(self, obj):
        if obj.profile_pic and hasattr(obj.profile_pic, 'url'):
            return '{}{}'.format(settings.CLOUDINARY_ROOT_URL, obj.profile_pic.url)
        return None


class OrgSerializer(serializers.ModelSerializer):
    owner = OwnerField(queryset=User.objects.all(), required=False)
    members = OnlyIdAndNameUserSerializer(many=True, required=False, read_only=True)
    date_joined = serializers.DateTimeField(read_only=True)
    rating = serializers.FloatField(read_only=True)
    no_of_members = serializers.IntegerField(read_only=True)
    profile_pic = CloudinaryImageField(source='profile_pic')

    class Meta:
        model = Organization
        exclude = ["password", "last_login"]

    def create(self, validated_data):
        owner = self.context["request"].user
        validated_data["owner"] = owner
        org = self.Meta.model.objects.create_org(**validated_data)
        return org


class OnlyIdAndNameOrgSerializer(serializers.ModelSerializer):
    profile_pic = CloudinaryImageField(source='profile_pic')
    class Meta:
        model = Organization
        fields = (
            "id",
            "name",
            "profile_pic",
        )


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "password",
            "email",
            "country",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        obj = self.Meta.model(**validated_data)
        if password is not None:
            obj.set_password(password)
        obj.save()
        return obj
