
const api_key = 'W5ckD6pTJDaW6OxZ8QF2rMGnVP7tBRIG';

async function get_weather() {
    let city_name = document.getElementById('search-input').value;
    const loc_url = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${api_key}&q=${city_name}`;

    try {
        const loc_response = await fetch(loc_url);
        const loc_data = await loc_response.json();

        if (loc_data.length === 0) {
            throw new Error("City not found");
        }

        const loc_key = loc_data[0].Key;
        const weather_url = `https://dataservice.accuweather.com/currentconditions/v1/${loc_key}?apikey=${api_key}&details=true`;

        let weather_response = await fetch(weather_url);
        let weather_data = await weather_response.json();

        // console.log(`Temperature: ${weather_data[0].Temperature.Metric.Value}°C`);
        // console.log(`Weather: ${weather_data[0].WeatherText}`);
        // console.log(`Humidity: ${weather_data[0].RelativeHumidity}%`);
        // console.log(`Wind Speed: ${weather_data[0].Wind.Speed.Metric.Value} km/h`);
        document.getElementById('city-name').innerHTML = `<h2>${city_name}</h2>`;
        document.getElementById('temp').innerHTML = `<p>${weather_data[0].Temperature.Metric.Value}°C</p>`;
        document.getElementById('weather-condition').innerHTML = `<p>${weather_data[0].WeatherText}</p>`;
        document.getElementById('humidity').innerHTML = `<p>${weather_data[0].RelativeHumidity}%</p>`;
        document.getElementById('wind-speed').innerHTML = `<p>${weather_data[0].Wind.Speed.Metric.Value} km/h</p>`;        
    } 
    catch (error) {
        console.error("Error:", error.message);
    }
}

document.getElementById("search-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        get_weather();
    }
});
// get_weather();


