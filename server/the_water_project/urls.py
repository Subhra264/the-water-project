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
from django.contrib import admin
from django.urls import path, include
from the_water_project.blogs.urls import routers as blog_router
from the_water_project.comments.urls import router as comment_router
from the_water_project.progress_report.urls import router as progress_report_and_tasks_router
from the_water_project.tags.urls import router as tags_router
from the_water_project.topics.urls import router as topics_router
from the_water_project.users.urls import router as user_org_router
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
    path("", include(router.urls)),
]
