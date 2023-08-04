const clientId = '30ddfddbc69c4dd5987ae940c7a9a853';
const clientSecret = 'e58e55643a4b42359091afbb9522de96';

var songsArray = [];
var artistsArray = [];

// get Token needed for searching Spotify API
const getToken = async () => {
    try {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
    
        const data = await result.json();
        return data.access_token;

    } catch(error) {
        console.error('Error:', error);
        const selectedSongBox = document.getElementById('selectedSongBox');
        selectedSongBox.innerHTML = `An error occured accessing Spotify's's database`;
    
    }
}

const searchBySong = async (token, searchInput) => {
    try {
        const result = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        })
    
        const data = await result.json();
        return data;

    } catch(error) {
        console.error('Error:', error);
        selectedSongBox.innerHTML = `An error occured accessing Spotify's's database`;
    
    }
}

const getSongAudioFeatures = async (token, songId) => {
    try {
        const result = await fetch(`https://api.spotify.com/v1/audio-features/${songId}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
    
        const data = await result.json();
        return data

    } catch(error) {
        console.error('Error:', error);
        const selectedSongBox = document.getElementById('selectedSongBox');
        selectedSongBox.innerHTML = `An error occured accessing Spotify's's database`;
    
    }

}

const getTrack = async (token, songId) => {
    try {
        const result = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
    
        const data = await result.json();
        return data
        
    } catch(error) {
        console.error('Error:', error);
        const selectedSongBox = document.getElementById('selectedSongBox');
        selectedSongBox.innerHTML = `An error occured accessing Spotify's's database`;
    
    }

}

const searchTracks = async (token, searchInput) => {
    try {
        const result = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        });
    
        const data = await result.json();
        return data.tracks.items
        
    } catch(error) {
        console.error('Error:', error);
        const selectedSongBox = document.getElementById('selectedSongBox');
        selectedSongBox.innerHTML = `An error occured accessing Spotify's's database`;
    
    }
}

async function fetchiTunesData(searchInput) {
    try {
    const artistApiUrl = `https://proxy-itunes-api.glitch.me/search?term=
    ${searchInput}&media=music&entity=musicTrack`;
    
    const songApiUrl = `https://proxy-itunes-api.glitch.me/search?term=
    ${searchInput}&media=music&entity=musicTrack`;

    const [artistResponse, songResponse] = await Promise.all([
        fetch(artistApiUrl),
        fetch(songApiUrl)
    ]);

    if (!artistResponse.ok) {
        throw new Error('Network response was not ok for artish fetch.');
    }

    if (!songResponse.ok) {
        throw new Error('Network response was not ok for song fetch.')
    }

    const artistJsonData = await artistResponse.json();
    const songJsonData = await songResponse.json();

    artistsArray = getSongsFromJson(artistJsonData);
    songsArray = getSongsFromJson(songJsonData);

    // displaySongGrid(artistsArray, 'artistsContainer');
    // console.log(songsArray);
    displaySongGrid(songsArray, 'songsContainer');


    } catch (error) {
    console.error('Error:', error);
    const selectedSongBox = document.getElementById('selectedSongBox');
    selectedSongBox.innerHTML = `An error occured accessing Itunes's database`;
    }
}

// JavaScript to update the value display when each slider changes
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('input[type="range"]');
    const sliderValues = document.querySelectorAll('span[id^="sliderValue"]');
  
    // Initial value display
    sliders.forEach((slider, index) => {
      sliderValues[index].innerHTML = `  ${slider.value}`;
    });
  
    // Update value display on slider change
    sliders.forEach((slider, index) => {
      slider.addEventListener('input', function() {
        sliderValues[index].innerHTML = ` ${slider.value}`;
      });
    });
  });
  

document.getElementById('resultsBox').addEventListener('click', function(event) {
    if (event.target.nodeName === 'IMG') { 

        const audioElement = document.getElementById('audio');
        audioElement.volume = .3; // Set the initial volume to 0.3 (30%)
        
        const imageId = event.target.getAttribute('data-image-id');
        const clickedSong = artistsArray[imageId];
       
        giveAudioSrc(clickedSong.audioSrc);
    }
})

document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput');
    const search = searchInput.value.trim();
    
    if (search) {
        (async () => {
            try {

                const token = await getToken();
                const searchResult = await searchBySong(token, search);
                
             
                if (searchResult.tracks.items.length !== 0) {
                    const songAudioFeatures = await getSongAudioFeatures(token, searchResult.tracks.items[0].id);
                    
                    
                    const track = await getTrack(token, searchResult.tracks.items[0].id)
                    
                    fetchiTunesData(search);


                    buildSelectedSongBox(songAudioFeatures, track);
                    const tracksArray = await searchTracks(token, search);
                    console.log(tracksArray);
                    

                    const songAudioFeaturesArray = [];

                    for (let item of tracksArray) {
                      const songAudioFeatures = await getSongAudioFeatures(token, item.id);
                      songAudioFeaturesArray.push(songAudioFeatures);
                    }

                    console.log(songAudioFeaturesArray)
                    displayTrackGrid(tracksArray, 'tracksContainer');

                } else {
                    const selectedSongBox = document.getElementById('selectedSongBox');
                    selectedSongBox.innerHTML = `No Search Results. Please try again.`;
                    
                }

            } catch (error) {
                console.error('Error:', error);
            }
        })();

    } else {
        const resultsBox = document.getElementById('resultsBox');

        const searchResultsTitle = document.createElement('h2')
        searchResultsTitle.textContent = `Search Results: `
        resultsBox.appendChild(searchResultsTitle)
        resultsBox.textContent = `Please enter a valid search.`;
    }

})
