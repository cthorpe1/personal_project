from django.db import models
from django.contrib.auth.models import User

class Marker(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='markers')
    name = models.CharField(max_length=220)
    lat = models.DecimalField(max_digits=11, decimal_places=8)
    lng = models.DecimalField(max_digits=11, decimal_places=8)
    details = models.IntegerField(default=None)

class Trip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trips')
    marker = models.ForeignKey(Marker, on_delete=models.CASCADE, related_name='trips')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    description = models.TextField()

class Photo(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='photos')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='photos')
    url = models.URLField()