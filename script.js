
async function getWeatherFor(location) {
    weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=f540c46c7826a6b13837d9d586e2e08b`, {mode: "cors"});

    console.log(weatherResponse);
}

//getWeatherFor("london");
