# Generated by Django 3.2.4 on 2021-07-06 07:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("topics", "0002_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Contribution",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("no_of_contributions", models.PositiveIntegerField(default=0)),
                (
                    "contributor",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
                ),
                ("topic", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="topics.topic")),
            ],
        ),
        migrations.AddField(
            model_name="topic",
            name="contributors",
            field=models.ManyToManyField(through="topics.Contribution", to=settings.AUTH_USER_MODEL),
        ),
    ]