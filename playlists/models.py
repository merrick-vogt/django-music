from django.db import models

# Create your models here.

class Song(models.Model):
    spotify_id = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=200)
    album = models.CharField(max_length=200)
    artist = models.CharField(max_length=100)
    # danceability_score = models.FloatField()
    # energy_score = models.FloatField()
    # valence_score = models.FloatField()

    def __str__(self):
        return self.title

class Playlist(models.Model):
    name = models.CharField(max_length=200)
    songs = models.ManyToManyField(Song, related_name='playlists')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
