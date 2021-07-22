from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        response.data["status_code"] = response.status_code

    return response


def not_found_404(request, exception):
    response = JsonResponse(data={"detail": "page not found", "status_code": status.HTTP_404_NOT_FOUND})
    response.status_code = status.HTTP_404_NOT_FOUND
    return response


def bad_request_400(request, exception):
    response = JsonResponse(data={"detail": "Bad request", "status_code": status.HTTP_400_BAD_REQUEST})
    response.status_code = status.HTTP_400_BAD_REQUEST
    return response


def unauthorized_401(request, exception):
    response = JsonResponse(data={"detail": "Unauthorized request", "status_code": status.HTTP_401_UNAUTHORIZED})
    response.status_code = status.HTTP_401_UNAUTHORIZED
    return response


def forbidden_403(request, exception):
    response = JsonResponse(data={"detail": "Request forbidden", "status_code": status.HTTP_403_FORBIDDEN})
    response.status_code = status.HTTP_403_FORBIDDEN
    return response


def server_error_500(request):
    response = JsonResponse(
        data={"detail": "Internal server error", "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR}
    )
    response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    return response
