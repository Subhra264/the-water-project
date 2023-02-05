from django.db.models.signals import pre_delete
from django.dispatch import receiver
from .models import Blog
import cloudinary


@receiver(pre_delete, sender=Blog)
def destroy_blog_front_img(sender, instance, **kwargs):
	cloudinary.uploader.destroy(instance.front_img.public_id)
