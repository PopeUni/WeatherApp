//const query = req.body.cityName
//const apiKey = "71873e9d8f5b8bb2d9a14353eb4ef0aa#";
//const units = "metric";
//const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apiKey




const api = {
  key: "71873e9d8f5b8bb2d9a14353eb4ef0aa#",
  baseurl: "https://api.openweathermap.org/data/2.5/"
}


const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}

function getResults(query) {

  console.log(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`);

  fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');

  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

  let icon = weather.weather[0].icon;
  let imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"


  let pic = document.getElementById("weatherIcon");
  pic.src = imageURL;



}


function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
