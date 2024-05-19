const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('.locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const bgVideo = document.getElementById('bg-video');
const forecastContainer = document.querySelector('.forecast-container');

// Default city when the page loads
let cityInput = "London";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});

form.addEventListener('submit', (e) => {
    if (search.value.length === 0) {
        alert('Please type in a city name');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});

function dayOfTheWeek(d, m, y) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return weekday[new Date(`${m}/${d}/${y}`).getDay()]; // Corrected date format
}

function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=9a26459497f34bee84b200049241805&q=${cityInput}&days=3`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            temp.innerHTML = data.current.temp_c + "&#176;";
            conditionOutput.innerHTML = data.current.condition.text;

            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11);

            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
            timeOutput.innerHTML = time;
            nameOutput.innerHTML = data.location.name;

            const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            icon.src = "./img/weather/64x64/" + iconId;

            // Weather details 
            cloudOutput.innerHTML = data.current.cloud + "%";
            humidityOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + " km/h";

            // Set default time of day
            let timeOfDay = "day";

            // Get unique id for each weather condition
            const code = data.current.condition.code;

            // Change to night if it is night time in the city
            if (!data.current.is_day) {
                timeOfDay = "night";
            }

            // Clear weather code
            if (code == 1000) {
                // Set clear background if the weather is clear
                bgVideo.src = `./img/${timeOfDay}/clear.mp4`;
                btn.style.background = "#e5ba92";

                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }

                // Cloudy weather codes
            } else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ) {
                bgVideo.src = `./img/${timeOfDay}/cloudy.mp4`;
                btn.style.background = "#fa6d1b";
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
                // Rainy weather
            } else if (
                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ) {
                bgVideo.src = `./img/${timeOfDay}/rainy.mp4`;
                btn.style.background = "#647d75";
                if (timeOfDay == "night") {
                    btn.style.background = "#325c80";
                }
                // Snowy weather
            } else {
                bgVideo.src = `./img/${timeOfDay}/snowy.mp4`;
                btn.style.background = "#4d72aa";
                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }

            // Display forecast data
            forecastContainer.innerHTML = "";
            data.forecast.forecastday.forEach(day => {
                const forecastDay = document.createElement("div");
                forecastDay.className = "forecast-day";
                forecastDay.innerHTML = `
                    <h5>${dayOfTheWeek(new Date(day.date).getDate(), new Date(day.date).getMonth() + 1, new Date(day.date).getFullYear())}</h5>
                    <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
                    <p>${day.day.maxtemp_c}&#176; / ${day.day.mintemp_c}&#176;</p>
                    <p>${day.day.condition.text}</p>
                `;
                forecastContainer.appendChild(forecastDay);
            });

            // Fade once all is done
            app.style.opacity = "1";
        })
        .catch(() => {
            alert('City not found, please try again');
            app.style.opacity = "1";
        });
}

// Fetch initial data for default city
fetchWeatherData();
app.style.opacity = "1";
