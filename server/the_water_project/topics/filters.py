from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from .models import Topic


class TopicListFilterBackEnd(DjangoFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if "pk" in view.kwargs:
            return queryset
        else:
            return super().filter_queryset(request, queryset, view)


class TopicListFilterSet(filters.FilterSet):
    no_of_issue__gt = filters.NumberFilter(field_name="no_of_issues", lookup_expr="gt")
    no_of_issue__gte = filters.NumberFilter(field_name="no_of_issues", lookup_expr="gte")
    no_of_issue__lt = filters.NumberFilter(field_name="no_of_issues", lookup_expr="lt")
    no_of_issue__lte = filters.NumberFilter(field_name="no_of_issues", lookup_expr="lte")

    class Meta:
        model = Topic
        fields = (
            "is_closed",
            "country",
            "no_of_issues",
            "progress_report__is_completed",
            "progress_report__total_no_of_tasks",
            "no_of_issue__gt",
            "no_of_issue__gte",
            "no_of_issue__lt",
            "no_of_issue__lte",
        )
