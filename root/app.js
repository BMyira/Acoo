function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let weatherAppCity = document.querySelector("#weather-app-city");
  weatherAppCity.innerHTML = searchInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);
