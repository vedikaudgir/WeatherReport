document.addEventListener("DOMContentLoaded", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather, showError);
    } else {
        document.getElementById("location").textContent = "Geolocation is not supported by this browser.";
    }
});

function getWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = 'a00dcc76cdc15a4a89b786dd88e03f58';  // Replace with your weather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const location = data.name;
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const weatherMain = data.weather[0].main;

            document.getElementById("location").textContent = `Location: ${location}`;
            document.getElementById("weather").textContent = `Temperature: ${temperature}°C, ${description}`;

            updateBackground(weatherMain);
        })
        .catch(error => {
            document.getElementById("location").textContent = "Unable to retrieve weather data.";
            document.getElementById("weather").textContent = "";
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").textContent = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").textContent = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("location").textContent = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").textContent = "An unknown error occurred.";
            break;
    }
}

function updateBackground(weatherMain) {
    let backgroundUrl = '';

    switch(weatherMain) {
        case 'Clear':
            backgroundUrl = 'url("/images_in_WeatherReport/clear.webp")';
            break;
        case 'Clouds':
            backgroundUrl = 'url("/images_in_WeatherReport/cloudy.jpg")';
            break;
        case 'Rain':
            backgroundUrl = 'url("/images_in_WeatherReport/rainy.webp")';
            break;
        case 'Snow':
            backgroundUrl = 'url("/images_in_WeatherReport/snow.avif")';
            break;
        case 'Thunderstorm':
            backgroundUrl = 'url("/images_in_WeatherReport/thunderstorm.webp")';
            break;
        case 'Drizzle':
            backgroundUrl = 'url("/images_in_WeatherReport/drizzle.jpg")';
            break;
        case 'Mist':
            backgroundUrl = 'url("/images_in_WeatherReport/misty.webp")';
            break;
        default:
            backgroundUrl = 'url("/images_in_WeatherReport/default.avif")';
            break;
    }

    document.body.style.backgroundImage = backgroundUrl;
}
