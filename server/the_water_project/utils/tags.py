from django.core.exceptions import ImproperlyConfigured
from rest_framework.generics import UpdateAPIView
from the_water_project.tags.models import Tag
from django.db.models import Model
import re
from the_water_project.tags.serializers import TagSerializer
from rest_framework.exceptions import NotFound, APIException
from rest_framework.response import Response


class TagAddOrRemoveObject(UpdateAPIView):
    serializer_class = TagSerializer
    model_class: Model = None
    remove_tag: bool = False

    def get_object(self):
        if not self.model_class:
            raise ImproperlyConfigured("you did not specify the value of model_class")
        obj_name = self.model_class.__name__.lower()
        matched_obj = {}
        if self.kwargs:
            for key in self.kwargs:
                match_obj = re.search(r"(.*)_id", key)
                if match_obj:
                    matched_obj.update({match_obj.group(1): self.kwargs[key]})

        obj_id = self.request.data.get("%s_id" % obj_name)
        try:
            obj = self.model_class.objects.get(id=obj_id)
        except Exception:
            raise NotFound("Either %s with the specified id not found or you did not provide the id" % obj_name)
        else:
            if matched_obj:
                prev_obj = obj
                self.check_existence_or_link(prev_obj, matched_obj, obj_name)
            return obj

    def check_existence_or_link(self, prev_obj, matched_obj, obj_name):
        elem = None
        for elem in matched_obj:
            if hasattr(prev_obj, elem):
                prev_obj = getattr(prev_obj, elem)
                if matched_obj[elem] != prev_obj.id:
                    raise NotFound(
                        "Either {} does not exist or {} with the specified id has no link to this {}".format(
                            elem, elem, obj_name
                        )
                    )
                break
        matched_obj.pop(elem)  # not sure if the function is pop or not
        if not matched_obj:
            return None
        self.check_existence_or_link(prev_obj, matched_obj, obj_name)

    def partial_update(self, request, *args, **kwargs):
        try:
            tag_name = request.data["tag"]
        except Exception:
            raise APIException("tag is required")
        else:
            obj = self.get_object()
            self.check_object_permissions(request, obj)
            try:
                tag_name = tag_name.lower()
                if not self.remove_tag:
                    tag, _ = Tag.objects.get_or_create(name=tag_name)
                    obj.tags.add(tag)
                else:
                    tag = obj.tags.get(name=tag_name)
                    obj.tags.remove(tag)
                return Response(self.get_serializer(tag).data)
            except Exception:
                operation = "adding" if not self.remove_tag else "removing"
                raise APIException("something went wrong while %s tag" % operation)
