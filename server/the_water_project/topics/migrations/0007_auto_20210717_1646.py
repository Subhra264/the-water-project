# Generated by Django 3.2.4 on 2021-07-17 11:16

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("topics", "0006_auto_20210717_1357"),
    ]

    operations = [
        migrations.AddField(
            model_name="topic",
            name="address",
            field=models.CharField(default=django.utils.timezone.now, max_length=150),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="topic",
            name="city_or_area",
            field=models.CharField(default="Kolkata", max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="topic",
            name="country",
            field=models.CharField(choices=[("IN", "INDIA"), ("US", "USA")], default="IN", max_length=60),
            preserve_default=False,
        ),
    ]
