# Generated by Django 3.2.4 on 2021-07-15 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("blogs", "0003_alter_blog_no_of_comments"),
    ]

    operations = [
        migrations.AddField(
            model_name="blog",
            name="updated_on",
            field=models.DateTimeField(auto_now=True),
        ),
    ]
