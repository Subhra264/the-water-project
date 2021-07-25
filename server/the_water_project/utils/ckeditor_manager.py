from ckeditor_uploader.views import upload, browse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def ckeditor_upload(*args, **kwargs):
    return upload(*args, **kwargs)


def ckeditor_browse(request, *args, **kwargs):
    return browse(request)
