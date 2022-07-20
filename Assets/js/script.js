// WHEN I view current weather conditions for that city
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var todaysDateEl = document.getElementById('#todays-date');
var DayOneEl = document.querySelector('.day-1');
var DayTwoEl = document.getElementById('.day-2');
var DayThreeEl = document.getElementById('.day-3');
var DayFourEl = document.getElementById('.day-4');
var dayFiveEl = document.getElementById('.day-5');
var tempEl = document.getElementById('#todays-temp');
var windEl = document.getElementById('#todays-wind');
var humidityEl = document.getElementById('#todays-humidity');
var uvEl = document.getElementById('#todays-uv-index');


let lat;
let lon;



const apiKey = `5a9e1210be78a52faa1f906df226b3b3`;
var userSearch = "Austin";




// var testUrl = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`
// Value from search form


// displays time to todays forcast and five-day forcast
var today = moment();
$("#todays-date").text(today.format("MMM Do, YYYY"));

let tomorrow  = moment().add(1,'days');
$('.day-1').text(tomorrow.format( 'LL'));

let TwoDays  = moment().add(2,'days');
$('.day-2').text(TwoDays.format( 'LL'));

let ThreeDays  = moment().add(3,'days');
$('.day-3').text(ThreeDays.format( 'LL'));

let FourDays  = moment().add(4,'days');
$('.day-4').text(FourDays.format( 'LL'));

let FiveDay  = moment().add(5,'days');
$('.day-5').text(FiveDay.format( 'LL'));




// document.getElementById("#searchTerm").value
function getLatLon() {
  var geoAPIurl = `https://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=5&appid=${apiKey}`;
  fetch(geoAPIurl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log("lat", data[0].lat);
      console.log("lon", data[0].lon);
      lat = data[0].lat.toFixed(2);
      lon = data[0].lon.toFixed(2);
      console.log(lat);
      console.log(lon);
      currentForecast(lat,lon);
    });
}
getLatLon();

function currentForecast(lat,lon) {
  var weatherAPIUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  fetch(weatherAPIUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // APPEND TO PAGE
      populateHTML(data.list);

    });
}
function populateHTML(data){
 for(i = 0; i < 40; i++){
   if(i % 8 === 0){
    var temperature = ((data[i].main.temp - 273.15) * 9/5 + 32).toFixed(2) ;
    var wind = data[i].wind.deg;
    var humidity = data[i].main.humidity;

    var windDiv = document.createElement('div');
    var tempDiv = document.createElement('div');
    var humidityDiv = document.createElement('div');

windDiv.textContent = wind;
tempDiv.textContent = temperature;
humidityDiv.textContent = humidity;

DayOneEl.appendChild(windDiv);
DayOneEl.appendChild(tempDiv);
DayOneEl.appendChild(humidityDiv);







   }
   
 }
}

