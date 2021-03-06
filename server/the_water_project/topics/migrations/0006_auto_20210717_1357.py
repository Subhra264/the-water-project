# Generated by Django 3.2.4 on 2021-07-17 08:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("topics", "0005_topic_updated_on"),
    ]

    operations = [
        migrations.AddField(
            model_name="issue",
            name="closed_on",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="topic",
            name="closed_on",
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="topic",
            name="updated_on",
            field=models.DateTimeField(),
        ),
    ]
