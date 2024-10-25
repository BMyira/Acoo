function displayCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-form-input");
  let h1 = document.querySelector("#weather-app-city");
  h1.innerHTML = input.value;
}

function currentTime(date) {
  let day = date.getDay();
  let hour = date.getHours();
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

  let formatDate = days[day];

  return `${formatDate} ${hour}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);

let formattedTime = document.querySelector(".day-time");
let currentDate = new Date();
formattedTime.innerHTML = currentTime(currentDate);
