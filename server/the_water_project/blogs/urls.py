from .views import BlogViewSet
from rest_framework.routers import DefaultRouter

app_name = "blogs"

routers = DefaultRouter()

routers.register(r"blogs", BlogViewSet, basename="blogs")
