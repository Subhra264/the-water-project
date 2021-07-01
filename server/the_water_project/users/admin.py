from django.contrib import admin
from .models import Organization, User
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.contrib.auth.admin import UserAdmin

# class UserCreationForm(forms.ModelForm):
#     class Meta:
#         model = User
#         fields = "__all__"


class TheUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = UserCreationForm.Meta.fields + (
            "age",
            "country",
            "address",
            "rating",
        )


class TheUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User
        fields = UserCreationForm.Meta.fields + (
            "age",
            "country",
            "address",
            "rating",
        )


class TheUserAdmin(UserAdmin):
    form = TheUserChangeForm
    add_form = TheUserCreationForm

    fieldsets = UserAdmin.fieldsets + (
        (
            "Extra Fields",
            {
                "fields": (
                    "age",
                    "country",
                    "address",
                    "rating",
                )
            },
        ),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            "Extra Fields",
            {
                "fields": (
                    "age",
                    "country",
                    "address",
                    "rating",
                )
            },
        ),
    )


admin.site.register(User, TheUserAdmin)
admin.site.register(Organization)
