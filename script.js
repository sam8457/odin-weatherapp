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
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=f540c46c7826a6b13837d9d586e2e08b`, {mode: "cors"});
    const weatherData = await weatherResponse.json();

    const weatherName = weatherData.weather[0].main;
    const weatherNameContent = document.querySelector("#weather-name > div.content");
    weatherNameContent.textContent = weatherName;

    const weatherIconsList = {
        "Clear":"./Images/sunny_FILL0_wght400_GRAD0_opsz48.svg",
        "Clouds":"./Images/cloudy_FILL0_wght400_GRAD0_opsz48.svg",
        "Rain":"./Images/rainy_FILL0_wght400_GRAD0_opsz48.svg",
        "Snow":"./Images/cloudy_snowing_FILL0_wght400_GRAD0_opsz48.svg",
        "Thunderstorm":"./Images/thunderstorm_FILL0_wght400_GRAD0_opsz48.svg",
    };
    const weatherIcon = document.querySelector("#weather-icon");
    weatherIcon.src = weatherIconsList[weatherName];

    const weatherDesc = weatherData.weather[0].description;
    const weatherDescContent = document.querySelector("#weather-desc > div.content");
    weatherDescContent.textContent = weatherDesc;

    const temp = Math.round(weatherData.main.temp);
    const tempContent = document.querySelector("#temp > div.content");
    tempContent.textContent = `${temp}°F`;

    const feelsLike = Math.round(weatherData.main.feels_like);
    const feelsLikeContent = document.querySelector("#feels-like > div.content");
    feelsLikeContent.textContent = `${feelsLike}°F`;

    const tempMin = Math.round(weatherData.main.temp_min);
    const tempMinContent = document.querySelector("#temp-min > div.content");
    tempMinContent.textContent = `${tempMin}°F`;

    const tempMax = Math.round(weatherData.main.temp_max);
    const tempMaxContent = document.querySelector("#temp-max > div.content");
    tempMaxContent.textContent = `${tempMax}°F`;

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

async function getForecastFor(location) {
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&APPID=f540c46c7826a6b13837d9d586e2e08b`, {mode: "cors"});
    const forecastData = await forecastResponse.json();

    const forecastContainer = document.querySelector("#forecast > div.content");
    forecastContainer.innerHTML = ''; // clear in case this is a second search

    const numForecastDays = 5;
    for (let i = 0; i < numForecastDays; i++) {
        
        const dateRaw = forecastData.list[i * 8 + 4].dt_txt; // [nth_day * 8 + 4] gets weather @ 12:pm each day
        const dateObj = new Date(dateRaw);
        const dayOfWeekNum = dateObj.getDay();
        const daysOfWeek = {
            0: "Sun",
            1: "Mon",
            2: "Tue",
            3: "Wed",
            4: "Thurs",
            5: "Fri",
            6: "Sat"
        };
        const dayOfWeekName = daysOfWeek[dayOfWeekNum];

        const weatherName = forecastData.list[i * 8 + 4].weather[0].main;
        const weatherIconsList = {
            "Clear":"./Images/sunny_FILL0_wght400_GRAD0_opsz48.svg",
            "Clouds":"./Images/cloudy_FILL0_wght400_GRAD0_opsz48.svg",
            "Rain":"./Images/rainy_FILL0_wght400_GRAD0_opsz48.svg",
            "Snow":"./Images/cloudy_snowing_FILL0_wght400_GRAD0_opsz48.svg",
            "Thunderstorm":"./Images/thunderstorm_FILL0_wght400_GRAD0_opsz48.svg",
        };
        const weatherIcon = weatherIconsList[weatherName];

        const temp = Math.round(forecastData.list[i * 8 + 4].main.temp);

        const forecastDay = document.createElement("div");
        forecastDay.innerHTML = `
        <div class="day-container">
            <div class="weekday">${dayOfWeekName}</div>
            <img class="day-icon" src="${weatherIcon}">
            <div class="day-temp">${temp}°F</div>
        </div>`;
        forecastContainer.appendChild(forecastDay);
    }
}

const searchButton = document.getElementById("search");
searchButton.addEventListener("click", (event) => event.preventDefault()); // don't reload page on click
searchButton.addEventListener("click", async () => {
    let location = getCityName();
    updateCityName(location);
    getWeatherFor(location);
    getForecastFor(location);
});

/*
    TODO:
        *Style searchbox and button for browser consitency (especially on chrome)
        *Make it look nice
        *Add windspeed, humidity
*/