# Generated by Django 3.2.4 on 2021-07-15 12:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("blogs", "0004_blog_updated_on"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="blog",
            name="likes",
        ),
        migrations.CreateModel(
            name="Like",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("no_of_likes", models.PositiveIntegerField(default=0)),
                (
                    "blog",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE, related_name="likes", to="blogs.blog"
                    ),
                ),
                ("users", models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]