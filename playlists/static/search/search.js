function createSlider(elementId, lowerValueId, upperValueId, minCookieName, maxCookieName) {
    var slider = document.getElementById(elementId);

    // If the slider element is not present, return
    if (!slider) {
        return;
    }

    // Try to read cookies, and use them if available. Otherwise, use default values.
    const minVal = parseInt(getCookie(minCookieName)) || 20;
    const maxVal = parseInt(getCookie(maxCookieName)) || 80;

    noUiSlider.create(slider, {
        start: [minVal, maxVal],
        connect: true,
        range: {
            'min': 0,
            'max': 100
        }
    });

    var lowerValue = document.getElementById(lowerValueId);
    var upperValue = document.getElementById(upperValueId);

    // Function to update the displayed slider values
    function updateValues() {
        var values = slider.noUiSlider.get();
        lowerValue.textContent = Math.round(values[0]);
        upperValue.textContent = Math.round(values[1]);
    }

    // Listen for slide event to adjust the value position
    slider.noUiSlider.on('update', updateValues);

    // Initial value set
    updateValues();
}

// Create sliders for Danceability, Energy, and Valence
createSlider('danceabilitySlider', 'danceabilityLowerValue', 'danceabilityUpperValue', 'min_danceability', 'max_danceability');
createSlider('energySlider', 'energyLowerValue', 'energyUpperValue', 'min_energy', 'max_energy');
createSlider('valenceSlider', 'valenceLowerValue', 'valenceUpperValue', 'min_valence', 'max_valence');

function performSearch() {
    console.log('performSearch JS function triggered');
    var query = document.getElementById('search_query').value;  
    var min_danceability = document.getElementById('danceabilityLowerValue').textContent;
    var max_danceability = document.getElementById('danceabilityUpperValue').textContent;
    var min_energy = document.getElementById('energyLowerValue').textContent;
    var max_energy = document.getElementById('energyUpperValue').textContent;
    var min_valence = document.getElementById('valenceLowerValue').textContent;
    var max_valence = document.getElementById('valenceUpperValue').textContent;

    // Set cookies
    document.cookie = "min_danceability=" + min_danceability + "; path=/";
    document.cookie = "max_danceability=" + max_danceability + "; path=/";
    document.cookie = "min_energy=" + min_energy + "; path=/";
    document.cookie = "max_energy=" + max_energy + "; path=/";
    document.cookie = "min_valence=" + min_valence + "; path=/";
    document.cookie = "max_valence=" + max_valence + "; path=/";

    // Make your GET request, appending the query and all filter parameters
    window.location.href = `/search/?query=${query}&min_danceability=${min_danceability}&max_danceability=${max_danceability}&min_energy=${min_energy}&max_energy=${max_energy}&min_valence=${min_valence}&max_valence=${max_valence}`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

