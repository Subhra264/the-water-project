from django.db.models.signals import pre_delete
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from .models import Organization
import cloudinary

User = get_user_model()

@receiver(pre_delete, sender=User)
def destroy_user_profile_pic(sender, instance, **kwargs):
	cloudinary.uploader.destroy(instance.profile_pic.public_id)

@receiver(pre_delete, sender=Organization)
def destroy_org_profile_pic(sender, instance, **kwargs):
	cloudinary.uploader.destroy(instance.profile_pic.public_id)
