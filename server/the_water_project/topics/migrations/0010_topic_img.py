# Generated by Django 3.2.4 on 2021-07-22 05:04

from django.db import migrations, models
import the_water_project.topics.models


class Migration(migrations.Migration):

    dependencies = [
        ("topics", "0009_topic_no_of_comments"),
    ]

    operations = [
        migrations.AddField(
            model_name="topic",
            name="img",
            field=models.ImageField(blank=True, null=True, upload_to=the_water_project.topics.models.unique_file_path),
        ),
    ]
