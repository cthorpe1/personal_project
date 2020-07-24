from django import forms
from .models import Marker, Photo

class MarkerForm(forms.ModelForm):
    class Meta:
        model = Marker
        fields = ('name','lat', 'lng', 'user', 'details')

class PhotoForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = ('trip','user', 'url')