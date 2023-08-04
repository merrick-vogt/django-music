// need to make a reset
function create1to10scale(decimal) {
    return Math.round(decimal*100)/10
}


function buildSelectedSongBox(songAudioFeatures, track) {
    
    const songSelectedBox = document.getElementById('selectedSongBox')
    songSelectedBox.innerHTML='';
    
    const dance = document.createElement('p');
    
    danceScore = create1to10scale(songAudioFeatures.danceability);
    dance.innerHTML = `Spotify <strong>Dance</strong> Rating: ${danceScore}`
    songSelectedBox.appendChild(dance)
    
    const energy = document.createElement('p');
    
    energyScore = create1to10scale(songAudioFeatures.energy);
    energy.innerHTML = `Spotify <strong>Energy</strong> Rating: ${energyScore}`
    songSelectedBox.appendChild(energy)
    
    const valence = document.createElement('p');
    valenceScore = create1to10scale(songAudioFeatures.valence);
    valence.innerHTML = `Spotify <strong>Valence</strong> Rating: ${valenceScore}`
    songSelectedBox.appendChild(valence)
    
    
    const total = document.createElement('p');
    const userDanceScore = document.getElementById('slider1').value
    const userEnergyScore = document.getElementById('slider2').value
    const userValenceScore = document.getElementById('slider3').value
    
    const missedBy = (Math.abs(userDanceScore-danceScore)+Math.abs(userEnergyScore-energyScore)+Math.abs(userValenceScore-valenceScore))/3;
    const score = Math.round(10*(10 - missedBy))/10;
    total.innerHTML = `Your score is <strong>${score}</strong> out of 10!`
    songSelectedBox.appendChild(total)
    
    const trackName = document.createElement('p');
    trackName.innerHTML = `<strong>${track.name}</strong> by ${track.artists[0].name}`;
    songSelectedBox.appendChild(trackName)

    
    
}



function getSongsFromJson(jsonData) {
    const tracks = jsonData.results;
    const songsArray = tracks.map((track) => ({
        imageSrc: track.artworkUrl100,
        songTitle: track.trackName,
        bandName: track.artistName,
        audioSrc: track.previewUrl
    }));
    return songsArray;
}
  
function createSongBox(song, index) {
    const songBox = document.createElement('div');
    songBox.classList.add('song-box');
  
    const image = document.createElement('img');
    image.src = song.imageSrc;
    image.alt = `Album cover did not display`;
    image.setAttribute('data-image-id', index);
    songBox.appendChild(image);
  
    const title = document.createElement('h3');
    title.textContent = song.songTitle;
    songBox.appendChild(title);
  
    const bandName = document.createElement('p');
    bandName.textContent = song.bandName;
    songBox.appendChild(bandName);
  
    return songBox;
}

function createTrackBox(track, index) {
    const trackBox = document.createElement('div');
    trackBox.classList.add('song-box');

    const image = document.createElement('img');
    
    image.src = track.album.images[1].url;
    image.setAttribute('data-image-id', index);
    trackBox.appendChild(image);

    const trackTitle = document.createElement('h3');
    trackTitle.textContent = track.name;
    trackBox.appendChild(trackTitle);

    return trackBox;
}

function displaySongGrid(songArray, containerId) {
    const container = document.getElementById(containerId);
    container.textContent = '';
  
    songArray.forEach((song, index) => {
      const songBox = createSongBox(song, index);
      container.appendChild(songBox);
    });
}

function displayTrackGrid(trackArray, containerId) {
    const container = document.getElementById(containerId);
    container.textContent = '';
  
    trackArray.forEach((track, index) => {
      const trackBox = createTrackBox(track, index);
      container.appendChild(trackBox);
    });
}
  