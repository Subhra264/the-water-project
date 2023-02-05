from django.db.models.signals import pre_delete
from django.dispatch import receiver
from .models import Topic
import cloudinary


@receiver(pre_delete, sender=Topic)
def destroy_topic_img(sender, instance, **kwargs):
	cloudinary.uploader.destroy(instance.img.public_id)
