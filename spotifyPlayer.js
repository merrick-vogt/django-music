// Function to get the playback state
async function getPlaybackState(token, player) {
    // Check if the Spotify player is ready and connected
    if (!player || !player._options || !player._options.id) {
      throw new Error('Spotify player is not ready or connected.');
    }
  
    // Call the Spotify Web API to get the playback state
    const response = await fetch(`https://api.spotify.com/v1/me/player`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    // Check if the API call was successful
    if (!response.ok) {
      throw new Error('Failed to fetch playback state.');
    }
  
    // Parse the response data
    const data = await response.json();
  
    // Return the playback state data
    return data;
  }
  