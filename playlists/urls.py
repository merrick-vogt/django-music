from django.urls import path
from . import views

app_name = 'playlists'

urlpatterns = [
    path('', views.home_view, name='home'),  # Example home view
    path('search/', views.search_results_view, name='search_results'),
    path('save_tracks/', views.save_tracks_view, name='save_tracks'),
    path('playlists/', views.playlist_list_view, name='playlist_list'),
    path('playlists/<int:playlist_id>/', views.playlist_detail_view, name='playlist_detail'),
]
