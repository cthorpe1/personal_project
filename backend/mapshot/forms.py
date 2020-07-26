from django import forms
from .models import Marker, Photo, Trip

class MarkerForm(forms.ModelForm):
    class Meta:
        model = Marker
        fields = ('name','lat', 'lng', 'user', 'details')

class PhotoForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = ('trip','user', 'url')

class TripForm(forms.ModelForm):
    class Meta:
        model = Trip
        fields = ('user','marker', 'name', 'description', 'start_date', 'end_date')