const apikey = "66111f5a2c562be8751fc375956b77b8";
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if(city) {
        try {
            const weatherData = await getWeather(city);
            displayWeather(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    }else {
        displayError("Please enter a city name.");
    }
}
);

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
    }
    return await response.json();
}

function displayWeather(data) {
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityElement = document.createElement("h1");
    cityElement.classList.add("cityName");
    cityElement.textContent = city;

    const tempElement = document.createElement("p");
    tempElement.classList.add("temperature");
    tempElement.textContent = `${Math.round(temp - 273.15)}°C`;

    const humidityElement = document.createElement("p");
    humidityElement.classList.add("humidity");
    humidityElement.textContent = `Humidity: ${humidity}%`;

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("description");
    descriptionElement.textContent = `Weather: ${description}`;

    const emojiElement = document.createElement("p");
    emojiElement.classList.add("weatherEmoji");
    emojiElement.textContent = getWeatherEmoji(id);


    card.appendChild(cityElement);
    card.appendChild(tempElement);
    card.appendChild(humidityElement);
    card.appendChild(descriptionElement);
    card.appendChild(emojiElement);

}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return "⛈️";
    } else if (weatherId >= 300 && weatherId <400) {
        return "🌦️"; 
    } else if (weatherId >= 500 && weatherId < 600) {
        return "🌧️"; 
    } else if (weatherId >= 600 && weatherId < 700) {
        return "❄️"; 
    } else if (weatherId >= 700 && weatherId < 800) {
        return "🌫️"; 
    } else if (weatherId === 800) {
        return "🌤️"; 
    } else if (weatherId >= 801 && weatherId < 900) {
        return "☁️"; 
    } else {
        return "❓"; 
    }
}

function displayError(message) {
    const errorElement = document.createElement("p");
    errorElement.textContent = message;
    errorElement.classList.add("errorDisplay");

    card.textContent = "";
    card.appendChild(errorElement);
    card.style.display = "flex";
}
