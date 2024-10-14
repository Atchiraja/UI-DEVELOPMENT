const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const descriptionElement = document.getElementById('description'); // Changed the variable name to avoid conflict
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

// Your API key (replace with your own key from OpenWeatherMap)
const apiKey = 'a2699dc7b055d81f0d02c193e13993c5'; 

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

// Function to get weather data from OpenWeatherMap API
async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Log the data for debugging
        console.log(data);

        if (response.ok) {
            displayWeather(data);
        } else {
            alert('City not found. Please enter a valid city.');
        }
    } catch (error) {
        alert('Error fetching weather data. Please try again later.');
        console.error('Fetch error:', error); // Log the error for debugging
    }
}

// Function to display the weather data on the webpage
function displayWeather(data) {
    const { name } = data;
    const { temp } = data.main;
    const { description } = data.weather[0];
    const { humidity: humidityValue } = data.main; // Renamed variable to avoid conflict
    const { speed } = data.wind;

    cityName.textContent = name;
    temperature.textContent = `Temperature: ${temp}°C`;
    descriptionElement.textContent = `Condition: ${description}`; // Use the new variable name
    humidity.textContent = `Humidity: ${humidityValue}%`;
    windSpeed.textContent = `Wind Speed: ${speed} m/s`;

    weatherInfo.style.display = 'block';
}
