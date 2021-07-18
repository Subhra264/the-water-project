"""the_water_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from the_water_project.utils import country_view
from django.contrib import admin
from django.urls import path, include
from the_water_project.blogs.urls import routers as blog_router
from the_water_project import blogs
from the_water_project.comments.urls import router as comment_router
from the_water_project import comments
from the_water_project.progress_report.urls import router as progress_report_and_tasks_router
from the_water_project import progress_report
from the_water_project.tags.urls import router as tags_router
from the_water_project.topics.urls import router as topics_router
from the_water_project.topics.urls import urlpatterns as topic_urls
from the_water_project.users.urls import router as user_org_router
from the_water_project import users
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.registry.extend(blog_router.registry)
router.registry.extend(comment_router.registry)
router.registry.extend(progress_report_and_tasks_router.registry)
router.registry.extend(tags_router.registry)
router.registry.extend(topics_router.registry)
router.registry.extend(user_org_router.registry)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("topics/", include(topic_urls)),
    path("", include(users.urls)),
    path("", include(blogs.urls)),
    path("", include(router.urls)),
    path("available-countries/", country_view, name="countries"),
    path("topics/<int:topic_id>/", include(comments.urls)),
    path("topics/<int:topic_id>/", include(progress_report.urls)),
    path("get-token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh-token/", TokenRefreshView.as_view(), name="token_refresh"),
    path("verify-token/", TokenVerifyView.as_view(), name="token_verify"),
]
