from rest_framework import serializers
from django.conf import settings

class CloudinaryImageField(serializers.Field):
	def to_representation(self, value):
		return settings.CLOUDINARY_ROOT_URL + value.url

	def to_internal_value(self, data):
		return data
