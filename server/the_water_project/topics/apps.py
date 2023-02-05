from django.apps import AppConfig


class TopicsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "the_water_project.topics"

    def ready(self) -> None:
        from . import signals
