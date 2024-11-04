function displayTemperature(response) {
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

  getForecast(response.data.city);
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

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  showCity(searchInput.value);
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "25104bod8aab713e851f420cccb3td47";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast">
            <div class="weather-day"><strong>${formatDate(
              day.time
            )}</strong></div>
             <img src="${day.condition.icon_url}" class="weather-icon" />
            <div class="weather-temperatures">
              <div class="weather-degree"><strong>${Math.round(
                day.temperature.maximum
              )}°</strong></div>
              <div clsaa="weather-degree">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
            </div>
   `;
    }
  });
  let weatherAppFuture = document.querySelector("#weather-app-future");
  weatherAppFuture.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);
showCity("Cape Town");
