from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=25)
    # FIXME: Should I made the "name" field unique?

    def __str__(self):
        return self.name
