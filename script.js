
async function getWeatherFor(location) {
    let weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=f540c46c7826a6b13837d9d586e2e08b`, {mode: "cors"});

    console.log(weatherResponse);
}

function updateCityName() {
    const search = document.getElementById("city");
    let location = search.value;
    const cityName = document.getElementById("city-name");
    cityName.textContent = `${location}`;
}

const searchButton = document.getElementById("search");
searchButton.addEventListener("click", (event) => event.preventDefault()); // don't reload page on click
searchButton.addEventListener("click", () => updateCityName());