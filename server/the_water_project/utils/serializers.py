from rest_framework import serializers
from django.conf import settings

class CloudinaryImageField(serializers.Field):
	def to_representation(self, value):
		if value and hasattr(value, 'url'):
			return settings.CLOUDINARY_ROOT_URL + value.url
		return None

	def to_internal_value(self, data):
		return data
