from django.shortcuts import render, redirect
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from spotipy import SpotifyException
from .models import Playlist, Song  # Import your Playlist model if needed
from django.db import models
from django.http import HttpResponseBadRequest, HttpResponse, JsonResponse
import json

# Set up Spotify API client
client_credentials_manager = SpotifyClientCredentials(
    client_id='3259917e1dfb4220abda16c477fc371a',
    client_secret='939c9bfd2d5c47c786af2456b1d6b536'
)

spotify = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# populate playlist dropdown 
def home_view(request):
    playlists = spotify.category_playlists('pop')['playlists']['items']
    # categories = spotify.categories(limit=50)['categories']['items']

    categories_result = spotify.categories(limit=50)
    categories = categories_result['categories']['items']
    for category in categories:
        print(category['name'])

    # print(categories)

    
    return render(request, 'search/index.html', {'playlists': playlists})


# Define your Playlist model and playlist-related functions here
def get_playlist_by_id(playlist_id):
    # Implement logic to fetch playlist details from the database based on playlist_id
    # Return the playlist object
    return playlist_id



# search results
def search_results_view(request):
    print('Entered a search')
    
    query = request.GET.get('query')
    # if not query:

    #     playlist_id = request.GET.get('playlist')
    #     print(playlist_id)
    #     playlists = spotify.category_playlists('pop')['playlists']['items']  # Fetch playlists for the "pop" category
    #     print(playlists)
    #     if playlist_id:
    #         # Fetch tracks from the selected playlist
    #         tracks = spotify.playlist_tracks(playlist_id)['items']
    #         # ... rest of the logic to filter and display tracks
    #     return render(request, 'search/search_results.html', {'playlists': playlists})
    
    # Get filter values
    filter_values = {
        'min_danceability': int(request.GET.get('min_danceability', request.COOKIES.get('min_danceability', 0))),
        'max_danceability': int(request.GET.get('max_danceability', request.COOKIES.get('max_danceability', 100))),
        'min_energy': int(request.GET.get('min_energy', request.COOKIES.get('min_energy', 0))),
        'max_energy': int(request.GET.get('max_energy', request.COOKIES.get('max_energy', 100))),
        'min_valence': int(request.GET.get('min_valence', request.COOKIES.get('min_valence', 0))),
        'max_valence': int(request.GET.get('max_valence', request.COOKIES.get('max_valence', 100)))
    }
    
    # Debug print filter values
    print(filter_values)

    LIMIT = 50
    NUM_REQUESTS = 4
    MAX_FILTERED_TRACKS = 10
    num_track = 0

    filtered_tracks = []

    try:
        for i in range(NUM_REQUESTS):
            if len(filtered_tracks) >= MAX_FILTERED_TRACKS:
                break
            
            # Fetch tracks
            results = spotify.search(query, type='track', limit=LIMIT, offset=i * LIMIT)
            tracks = results['tracks']['items']

            
            for track in tracks:
                if len(filtered_tracks) >= MAX_FILTERED_TRACKS:
                    break
                
                # Fetch and round audio features
                features = spotify.audio_features([track['id']])
                danceability = int(round(features[0]['danceability'] * 100))
                energy = int(round(features[0]['energy'] * 100))
                valence = int(round(features[0]['valence'] * 100))

                # Debug print track features
                # print(f"Danceability: {danceability} Energy: {energy} Valence: {valence} Track: {track['name']}")

                # Apply filter
                if filter_values['min_danceability'] <= danceability <= filter_values['max_danceability'] \
                and filter_values['min_energy'] <= energy <= filter_values['max_energy'] \
                and filter_values['min_valence'] <= valence <= filter_values['max_valence']:
                    extended_track = track.copy()
                    extended_track.update({'danceability': danceability, 'energy': energy, 'valence': valence})
                    filtered_tracks.append(extended_track)
                
                # Increment num_track (do not reset it)
                num_track += 1

    except Exception as e:
        print(f"An error occurred: {e}")

    print(f'How many songs did it take? {num_track}')
    print(f'Filtered tracks: {len(filtered_tracks)}')
    
    # Render the response
    response = render(request, 'search/search_results.html', {'tracks': filtered_tracks})
    
    # Set cookies for the new filter values
    for key, value in filter_values.items():
        response.set_cookie(key, value)

    return response


# save tracks in local db
# store spotify_id as unique identifier
# function checks whether the song is already in database. 
def save_tracks_view(request):
    if request.method == "POST":
        # Extracting selected songs and the playlist name from the POST request
        selected_songs = request.POST.getlist('selected_songs')
        playlist_name = request.POST['playlist_name']

        # Create a new Playlist
        playlist = Playlist(name=playlist_name)
        playlist.save()

        # For each Spotify ID received
        for spotify_id in selected_songs:
            # Check if a Song with that Spotify ID already exists
            song, created = Song.objects.get_or_create(spotify_id=spotify_id)

            # If the song is newly created, fill in the details
            if created:
                 # Get the song details from the hidden input fields
                song.title = request.POST[f'track_{spotify_id}_name']
                song.album = request.POST[f'track_{spotify_id}_album']
                song.artist = request.POST[f'track_{spotify_id}_artist']
                song.save()

            # Associate the song with the new playlist
            playlist.songs.add(song)

        return redirect('playlists:playlist_detail', playlist_id=playlist.id)
    else:
        return HttpResponseBadRequest("Invalid request method")



# Define your playlist-related views here
def playlist_list_view(request):
    # Fetch a list of all playlists from the database
    playlists = Playlist.objects.all()
    return render(request, 'playlists/playlist_list.html', {'playlists': playlists})


def playlist_detail_view(request, playlist_id):
    playlist = Playlist.objects.get(pk=playlist_id)  # Fetch the specific playlist
    songs = playlist.songs.all()  # Fetch songs associated with the playlist

    # Get Spotify IDs of all songs to fetch their audio features
    spotify_ids = [song.spotify_id for song in songs]
    
    try:
        features = spotify.audio_features(spotify_ids)
    except SpotifyException as e:
        print(f"An error occurred while fetching audio features: {e}")
        features = [{} for _ in spotify_ids]  # Fallback to an empty list of features
    
    # Simplifying the features for each track
    simplified_features = [{k: int(round(track[k] * 100)) for k in ('danceability', 'energy', 'valence')} for track in features]

    # Creating a list to hold the combined song and feature data
    combined_data = []

    # Merging the song and simplified feature data for each song
    for i, song in enumerate(songs):
        combined_data.append({
            'song': song,
            'feature': simplified_features[i]  # Assuming that 'songs' and 'simplified_features' are of the same length
        })

    # Updating the context
    context = {
        'playlist': playlist,
        'combined_data': combined_data,
    }
    
    return render(request, 'playlists/playlist_detail.html', context)


