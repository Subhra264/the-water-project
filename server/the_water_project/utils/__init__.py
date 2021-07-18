from rest_framework.response import Response
from rest_framework.decorators import api_view

COUNTRY_CHOICES = [
    ("IN", "INDIA"),
    ("US", "USA"),
    # will be extended
]


@api_view(
    [
        "GET",
    ]
)
def country_view(request):
    countries = {"countries": []}
    for _, country in COUNTRY_CHOICES:
        countries["countries"].append(country)
    return Response(countries)
