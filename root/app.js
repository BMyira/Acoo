function displayTemperature(response) {
  console.log(response.data);

  let weatherAppCity = document.querySelector("#weather-app-city");
  weatherAppCity.innerHTML = response.data.city;
  let timeElement = document.querySelector("#day-time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = displayTime(date);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" /> `;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(
    response.data.temperature.current
  )}`;
}

function displayTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showCity(city) {
  let apiKey = "25104bod8aab713e851f420cccb3td47";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayForecast() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast">
            <div class="weather-day"><strong>${day}</strong></div>
            <div class="weather-icon">🌤</div>
            <div class="weather-temperatures">
              <div class="weather-degree"><strong>19°</strong></div>
              <div clsaa="weather-degree">10°</div>
            </div>
            </div>
   `;
  });
  let weatherAppFuture = document.querySelector("#weather-app-future");
  weatherAppFuture.innerHTML = forecastHtml;
}

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  showCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);
showCity("Cape Town");
displayForecast();
