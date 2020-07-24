from django.http import HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, MarkerSerializer, TripSerializer, PhotoSerializer
from .forms import MarkerForm, PhotoForm
from .models import Marker, Trip, Photo
import json

#----Auth Views------#
@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#----Marker Views------#
@csrf_exempt
def marker_list(request):
    data = json.load(request)
    user = User.objects.get(username=data['username'])
    markers = Marker.objects.filter(user=user.id)
    serialized_markers = MarkerSerializer(markers).all_markers
    return JsonResponse(data=serialized_markers, status=200)


def marker_detail(request, marker_id):
    marker = Marker.objects.get(id=marker_id)
    if isinstance(marker, marker):
        serialized_marker = MarkerSerializer(marker).marker_detail
        return JsonResponse(data=serialized_marker, status=200)

@csrf_exempt
def new_marker(request):
    if request.method == "POST":
        data = json.load(request)
        user = User.objects.get(username=data['username'])
        data['user'] = user.id
        form = MarkerForm(data)
        if form.is_valid():
            marker = form.save(commit=True)
            serialized_marker = MarkerSerializer(marker).marker_detail
            return JsonResponse(data=serialized_marker, status=200)
        else:
            print(form.errors)

@csrf_exempt
def edit_marker(request, marker_id):
    marker = Marker.objects.get(id=marker_id)
    if request.method == "POST":
        data = json.load(request)
        form = MarkerForm(data, instance=marker)
        if form.is_valid():
            marker = form.save(commit=True)
            serialized_marker = MarkerSerializer(marker).marker_detail
            return JsonResponse(data=serialized_marker, status=200)


@csrf_exempt
def delete_marker(request, marker_id):
    if request.method == "POST":
        marker = Marker.objects.get(id=marker_id)
        marker.delete()
    return JsonResponse(data={'status': 'Successfully deleted marker.'}, status=200)

#----Trip Views------#
@csrf_exempt
def trip_list(request):
    data = json.load(request)
    user = User.objects.get(username=data['username'])
    marker = Marker.objects.get(name=data['marker'])
    trips = Trip.objects.filter(user=user.id, marker=marker.id)
    if len(trips):
        serialized_trips = TripSerializer(trips).all_trips
        return JsonResponse(data=serialized_trips, status=200)
    else:
        return JsonResponse(data={'trips': 'none'}, status=200)

#----Photo Views------#
@csrf_exempt
def photo_list(request):
    data = json.load(request)
    user = User.objects.get(username=data['username'])
    trip = Trip.objects.get(name=data['tripName'])
    photos = Photo.objects.filter(user=user.id, trip=trip.id)
    if len(photos):
        serialized_photos = PhotoSerializer(photos).all_photos
        return JsonResponse(data=serialized_photos, status=200)
    else:
        return JsonResponse(data={'photos': 'none'}, status=200)

@csrf_exempt
def new_photo(request):
    if request.method == "POST":
        data = json.load(request)
        user = User.objects.get(username=data['username'])
        trip = Trip.objects.get(name=data['tripName'])
        data['user'] = user.id
        data['trip'] = trip.id
        form = PhotoForm(data)
        if form.is_valid():
            photo = form.save(commit=True)
            serialized_photo = PhotoSerializer(photo).photo_detail
            return JsonResponse(data=serialized_photo, status=200)
        else:
            print(form.errors)