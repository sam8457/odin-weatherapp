function getCityName() {
    const search = document.getElementById("city");
    let location = search.value;
    return location;
}

async function getWeatherFor(location) {
    const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=f540c46c7826a6b13837d9d586e2e08b`, {mode: "cors"});
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    console.log(weatherData.weather[0].main);
}

function updateResultsPane() {
    const results = document.getElementById("results");
    const resultsList = results.childNodes;

    // nodelists indexed by [nth_element *2+1]
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
    updateResultsPane();
    // getWeatherFor(location);
});