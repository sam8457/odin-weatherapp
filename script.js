function getCityName() {
    const search = document.getElementById("city");
    let location = search.value;
    return location;
}

function updateCityName(location) {
    const cityName = document.getElementById("city-name");
    cityName.textContent = `${location}`;
}

async function getWeatherFor(location) {
    // const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=f540c46c7826a6b13837d9d586e2e08b`, {mode: "cors"});
    // const weatherData = await weatherResponse.json();

    // const weatherNameResult = weatherData.weather[0].main;
    const weatherName = "Clear";
    const weatherNameContent = document.querySelector("#weather-name > div.content");
    weatherNameContent.textContent = weatherName;

    const weatherIconsList = {
        "Clear":"./Images/sunny_FILL0_wght400_GRAD0_opsz48.svg",
        "Rain":"./Images/rainy_FILL0_wght400_GRAD0_opsz48.svg",
        "Thunderstorm":"./Images/thunderstorm_FILL0_wght400_GRAD0_opsz48.svg",
        "Snow":"./Images/cloudy_snowing_FILL0_wght400_GRAD0_opsz48.svg",
        "Clouds":"./Images/cloudy_FILL0_wght400_GRAD0_opsz48.svg",
    };
    const weatherIcon = document.querySelector("#weather-icon");
    weatherIcon.src = weatherIconsList[weatherName];

    // const temp = Math.round(weatherData.main.temp);
    const temp = "45";
    const tempContent = document.querySelector("#temp > div.content");
    tempContent.textContent = `${temp}°F`;

    // const temp = Math.round(weatherData.main.feels_like);
    const feelsLike = "40";
    const feelsLikeContent = document.querySelector("#feels-like > div.content");
    feelsLikeContent.textContent = `${feelsLike}°F`;

    // const tempMin = Math.round(weatherData.main.temp_min);
    const tempMin = "30";
    const tempMinContent = document.querySelector("#temp-min > div.content");
    tempMinContent.textContent = `${tempMin}°F`;

    // const tempMax = Math.round(weatherData.main.temp_max);
    const tempMax = "50";
    const tempMaxContent = document.querySelector("#temp-max > div.content");
    tempMaxContent.textContent = `${tempMax}°F`;

    // const weatherDesc = weatherData.weather[0].description;
    const weatherDesc = "few clouds";
    const weatherDescContent = document.querySelector("#weather-desc > div.content");
    weatherDescContent.textContent = weatherDesc;

    

    /*
    // change days
    const currentDate = new Date();
    const weekday = currentDate.toLocaleString("default", {weekday: "short"});
    const month = currentDate.toLocaleString("default", {month: "short"});
    const date = currentDate.getDate();
    resultsList[2].textContent = weekday;
    resultsList[3].textContent = month;
    resultsList[4].textContent = `${date}`;   
    */
}

const searchButton = document.getElementById("search");
searchButton.addEventListener("click", (event) => event.preventDefault()); // don't reload page on click
searchButton.addEventListener("click", async () => {
    let location = getCityName();
    updateCityName(location);
    getWeatherFor(location);
});