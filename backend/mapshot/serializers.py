from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from builtins import object

#-------- Auth -------- #
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')

#-------- Markers -------- #
class MarkerSerializer(object):
    def __init__(self, body):
        self.body = body

    @property
    def all_markers(self):
        output = {'markers': []}

        for marker in self.body:
            marker_details = {
                'id':marker.id,
                'name': marker.name,
                'lat': marker.lat,
                'lng': marker.lng,
                'details': marker.details
                
            }
            output['markers'].append(marker_details)

        return output

    @property
    def marker_detail(self):
        detail_object = {
            'id':self.body.id,
            'name': self.body.name,
            'lat': self.body.lat,
            'lng': self.body.lng,
            'details': self.body.details
        }
        return detail_object

#-------- Trips -------- #
class TripSerializer(object):
    def __init__(self, body):
        self.body = body

    @property
    def all_trips(self):
        output = {'trips': []}

        for trip in self.body:
            trip_details = {
                'id':trip.id,
                'user': trip.user.id,
                'marker': trip.marker.id,
                'name': trip.name,
                'start_date': trip.start_date,
                'end_date': trip.end_date,
                'description': trip.description
                
            }
            output['trips'].append(trip_details)

        return output

    @property
    def trip_detail(self):
        detail_object = {
            'id':self.body.id,
            'user': self.body.user.id,
            'marker': self.body.marker.id,
            'name': self.body.name,
            'start_date': self.body.start_date,
            'end_date': self.body.end_date,
            'description': self.body.description
        }
        return detail_object

#-------- Photos -------- #
class PhotoSerializer(object):
    def __init__(self, body):
        self.body = body

    @property
    def all_photos(self):
        output = {'photos': []}

        for photo in self.body:
            photo_details = {
                'id':photo.id,
                'trip': photo.trip.id,
                'user': photo.user.id,
                'url': photo.url, 
            }
            output['photos'].append(photo_details)

        return output

    @property
    def photo_detail(self):
        detail_object = {
                'id':self.body.id,
                'trip': self.body.trip.id,
                'user': self.body.user.id,
                'url': self.body.url, 
            }
        return detail_object