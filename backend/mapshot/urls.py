from django.urls import path, include
from . import views

urlpatterns = [
    # Auth Routes
    path('current_user/', views.current_user),
    path('user/new/', views.UserList.as_view()),

    #Marker Routes
    path('markers', views.marker_list, name='marker_list'),
    path('markers/new', views.new_marker, name='new_marker'),
    path('markers/<int:marker_id>/delete', views.delete_marker, name='delete_marker'),

    #Trip Routes
    path('trips', views.trip_list, name='trip_list'),
    path('trips/new', views.new_trip, name='new_trip'),

    #Photo Routes
    path('photos', views.photo_list, name='photo_list'),
    path('photos/new', views.new_photo, name='new_photo'),

]