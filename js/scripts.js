const apiKey = 'YOUR_OPEN_WEATHER_API_KEY'; // Replace with your actual API key

async function fetchWeatherByLocation(location) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchWeatherByCoords(lat, lon) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayWeather(data) {
    const weatherContainer = document.getElementById('weather');
    weatherContainer.innerHTML = `
        <h3>Weather in ${data.name}</h3>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather icon">
        <p>Temperature: ${data.main.temp}°F</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}

document.getElementById('fetchWeatherBtn').addEventListener('click', () => {
    const locationInput = document.getElementById('locationInput').value;
    fetchWeatherByLocation(locationInput);
});

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
    }, () => {
        console.log('Geolocation is not available or not permitted by the user.');
    });
}
