const clientId = '30ddfddbc69c4dd5987ae940c7a9a853';
const clientSecret = 'e58e55643a4b42359091afbb9522de96';

var songsArray = [];
var artistsArray = [];

// get Token needed for searching Spotify API
const getToken = async () => {

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
}

const searchBySong = async (token, searchInput) => {

    const result = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    })

    const data = await result.json();
    console.log(data)
    return data;
}

const getSongAudioFeatures = async (token, songId) => {

    const result = await fetch(`https://api.spotify.com/v1/audio-features/${songId}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    console.log("Response Data:", data);
    console.log(`danceability: ${data.danceability}`)
    return data

}

const getTrack = async (token, songId) => {

    const result = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    return data

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

    displaySongGrid(artistsArray, 'artistsContainer');
    displaySongGrid(songsArray, 'songsContainer');


    } catch (error) {
    console.error('Error:', error);
    }
}

// JavaScript to update the value display when each slider changes
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('input[type="range"]');
    const sliderValues = document.querySelectorAll('span[id^="sliderValue"]');
  
    // Initial value display
    sliders.forEach((slider, index) => {
      sliderValues[index].textContent = slider.value;
    });
  
    // Update value display on slider change
    sliders.forEach((slider, index) => {
      slider.addEventListener('input', function() {
        sliderValues[index].textContent = slider.value;
      });
    });
  });
  

document.getElementById('resultsBox').addEventListener('click', function(event) {
    if (event.target.nodeName === 'IMG') { 
        
        const imageId = event.target.getAttribute('data-image-id');
        const clickedSong = artistsArray[imageId];
       
        giveAudioSrc(clickedSong.audioSrc);
    }
})

document.getElementById('searchButton').addEventListener('click', () => {
    const usernameInput = document.getElementById('searchInput');
    const search = usernameInput.value.trim();
    
    if (search) {
        (async () => {
            try {
                const token = await getToken();
                const searchResult = await searchBySong(token, search);
                const songAudioFeatures = await getSongAudioFeatures(token, searchResult.tracks.items[0].id);
                const track = await getTrack(token, searchResult.tracks.items[0].id)
                console.log(track);
                fetchiTunesData(search);
                buildSelectedSongBox(songAudioFeatures, track);

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
