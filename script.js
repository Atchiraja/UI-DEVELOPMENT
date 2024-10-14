// Arrow function to validate input
const validateCityInput = () => {
  const city = document.getElementById('city').value.trim();
  const cityError = document.getElementById('cityError');
  
  cityError.style.display = 'none';
  
  if (!city) {
    cityError.textContent = 'City name cannot be empty';
    cityError.style.display = 'block';
    return false;
  }
  
  return true;
};

// Arrow function to fetch weather data
const getWeatherData = async (city) => {
  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.cod === 200) {
      displayWeather(data);
    } else {
      displayError('City not found. Please try again.');
    }
  } catch (error) {
    displayError('Error fetching data.');
  }
};

// Arrow function to display weather
const displayWeather = (data) => {
  const weatherResult = document.getElementById('weatherResult');
  weatherResult.innerHTML = `
    <h2>Weather in ${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Description: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
};

// Arrow function to display error
const displayError = (message) => {
  const weatherResult = document.getElementById('weatherResult');
  weatherResult.innerHTML = `<p style="color:red;">${message}</p>`;
};

// Form submit event
document.getElementById('weatherForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (validateCityInput()) {
    const city = document.getElementById('city').value.trim();
    getWeatherData(city);
  }
});
