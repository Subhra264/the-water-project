from django.apps import AppConfig


class BlogsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "the_water_project.blogs"

    def ready(self) -> None:
        from . import signals