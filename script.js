function getCityName() {
    const search = document.getElementById("city");
    let location = search.value;
    return location;
}

async function getWeatherFor(location) {
    const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=f540c46c7826a6b13837d9d586e2e08b`, {mode: "cors"});
    const weatherData = await weatherResponse.json();
    
    const results = document.getElementById("results");
    const resultsList = results.childNodes;

    // change temp/weather
    const weatherDescription = weatherData.weather[0].main;
    const currentTemp = Math.round(weatherData.main.temp);
    const hiTemp = Math.round(weatherData.main.temp_max);
    const loTemp = Math.round(weatherData.main.temp_min);
    resultsList[1 *2+1].textContent = weatherDescription;
    resultsList[2 *2+1].textContent = `${currentTemp}°F`;
    resultsList[6 *2+1].textContent = `${loTemp}°F`;
    resultsList[7 *2+1].textContent = "—";
    resultsList[8 *2+1].textContent = `${hiTemp}°F`;

    // change days
    const currentDate = new Date();
    const weekday = currentDate.toLocaleString("default", {weekday: "short"});
    const month = currentDate.toLocaleString("default", {month: "short"});
    const date = currentDate.getDate();
    resultsList[3 *2+1].textContent = weekday;
    resultsList[4 *2+1].textContent = month;
    resultsList[5 *2+1].textContent = `${date}`;   

    // change weather icon
    const weatherIcons = {
        "Clear":"./Images/sunny_FILL0_wght400_GRAD0_opsz48.svg",
        "Rain":"./Images/rainy_FILL0_wght400_GRAD0_opsz48.svg",
        "Thunderstorm":"./Images/thunderstorm_FILL0_wght400_GRAD0_opsz48.svg",
        "Snow":"./Images/cloudy_snowing_FILL0_wght400_GRAD0_opsz48.svg",
        "Clouds":"./Images/cloudy_FILL0_wght400_GRAD0_opsz48.svg",
    };
    resultsList[0 *2+1].src = weatherIcons[weatherDescription];
}

// for testing only
function updateResultsPane() {
    const results = document.getElementById("results");
    const resultsList = results.childNodes;

    // nodelists indexed by [nth_element * 2 + 1]
    resultsList[1 *2+1].textContent = "Cloudy";
    resultsList[2 *2+1].textContent = "23c";
    resultsList[3 *2+1].textContent = "";
}

function updateCityName(location) {
    const cityName = document.getElementById("city-name");
    cityName.textContent = `${location}`;
}

const searchButton = document.getElementById("search");
searchButton.addEventListener("click", (event) => event.preventDefault()); // don't reload page on click
searchButton.addEventListener("click", async () => {
    let location = getCityName();
    updateCityName(location);
    // updateResultsPane();
    getWeatherFor(location);
});