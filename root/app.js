function showTemperature(response) {
  let weatherTemperature = document.querySelector("#weather-app-value");
  let temperatureElement = Math.round(response.data.temperature.current);
  let h1 = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#weather-app-icon");
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  h1.innerHTML = response.data.city;
  weatherTemperature.innerHTML = temperatureElement;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

function showCity(city) {
  let apiKey = "25104bod8aab713e851f420cccb3td47";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function displayCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-form-input");

  showCity(input.value);
}

function currentTime(date) {
  let day = date.getDay();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formatDate = days[day];

  return `${formatDate} ${hour}:${minutes}`;
}

function showForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-date">
  <div class="weather-forecast-day">${day}</div>
  <div class="weather-forecast-icon">🌤</div>
  <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature">
      <strong>10°</strong>
    </div>
    <div class="weather-forecast-temperature">15°</div>
  </div>
</div>`;
  });
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);

let formattedTime = document.querySelector(".day-time");
let currentDate = new Date();
formattedTime.innerHTML = currentTime(currentDate);

showCity("Hamburg");
showForecast();
