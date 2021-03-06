# Generated by Django 3.2.4 on 2021-07-01 13:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("contenttypes", "0002_remove_content_type_name"),
        ("tags", "0001_initial"),
        ("comments", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Issue",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=150)),
                ("date", models.DateTimeField(auto_now_add=True)),
                ("is_closed", models.BooleanField(default=False)),
                ("no_of_comments", models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name="Topic",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("object_id", models.PositiveIntegerField()),
                ("title", models.CharField(max_length=150)),
                ("date", models.DateTimeField(auto_now_add=True)),
                ("is_closed", models.BooleanField(default=False)),
                ("stars", models.PositiveIntegerField(default=0)),
                ("no_of_issues", models.PositiveIntegerField(default=0)),
                (
                    "content_type",
                    models.ForeignKey(
                        limit_choices_to=models.Q(
                            models.Q(("app_label", "users"), ("model", "User")),
                            models.Q(("app_label", "users"), ("model", "Organization")),
                            _connector="OR",
                        ),
                        on_delete=django.db.models.deletion.CASCADE,
                        to="contenttypes.contenttype",
                    ),
                ),
                (
                    "description",
                    models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to="comments.startingcomment"),
                ),
                ("tags", models.ManyToManyField(blank=True, to="tags.Tag")),
            ],
        ),
    ]
