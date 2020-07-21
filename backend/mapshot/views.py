from django.http import HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, MarkerSerializer
from .forms import MarkerForm
from .models import Marker
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
def marker_list(request):
    markers = Marker.objects.all()
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