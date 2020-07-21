from django.contrib import admin
from .models import Marker, Trip, Photo
# Register your models here.
admin.site.register(Marker)
admin.site.register(Trip)
admin.site.register(Photo)