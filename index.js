// DOM variables
const cityFrom = document.querySelector("#cityFrom");
const cityTo = document.querySelector("#cityTo");
const btnSearch = document.querySelector("#btnSearch");
const panelFrom = document.querySelector("#panelFrom");
const panelTo = document.querySelector("#panelTo");

//api
const apiKey = "2a31341e272379211fb9f0ad3c955abd";

btnSearch.addEventListener("click", e => {
  e.preventDefault();

  //set loading btn
  btnSearch.classList.add('is-loading');

  // check input details
  if (cityFrom.value == cityTo.value) {
    alert("Please choose different cities");
  } else {
    getData();
  }
});

async function getData() {
  let res1 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityFrom.value}&appid=${apiKey}&units=metric`);
  let fromData = await res1.json();
  await putFromData(fromData);

  let res2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityTo.value}&appid=${apiKey}&units=metric`);
  let toData = await res2.json();
  await putToData(toData);

  btnSearch.classList.remove('is-loading');
}


// put city from data
function putFromData(data) {

    //set header
  let fromDisplay = `<div class="panel-heading">${data.city.name}</div>`;
  // get filtered weather data
  let filteredWeather = getFilteredData(data);
  //loop weather data and add to display
  filteredWeather.forEach(weather => {
    let day = new Date(weather.dt_txt);
    fromDisplay += `
        <div class="panel-block">
                <img src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png" alt="">
            <p>
            <strong>Day: </strong> 
                <small>${getDayOfTheWeek(day.getDay())}</small> &nbsp; 
            <strong>Weather:</strong> 
                <small>${weather.weather[0].main}</small> &nbsp; 
            <strong>Description:</strong> 
                <small>${weather.weather[0].description}</small> &nbsp;
            <strong>Temperature:</strong> 
                <small>${weather.main.temp } C</small> &nbsp;
            <strong>Wind Speed:</strong> 
                <small>${weather.wind.speed} m/s</small> &nbsp;
            <strong>Wind degree:</strong> 
                <small>${ Math.round(weather.wind.deg)} deg</small> &nbsp;
            </p>
        </div>
        `;

        // inject into HTML
        panelFrom.innerHTML = fromDisplay;
  });
}

// put city to Data
function putToData(data) {
  let toDisplay = `<div class="panel-heading">${data.city.name}</div>`;

  let filteredWeather = getFilteredData(data);

  filteredWeather.forEach(weather => {
    let day = new Date(weather.dt_txt);
    toDisplay += `
            <div class="panel-block">
                    <img src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png" alt="">
                <p>
                <strong>Day: </strong> 
                    <small>${getDayOfTheWeek(day.getDay())}</small> &nbsp; 
                <strong>Weather:</strong> 
                    <small>${weather.weather[0].main}</small> &nbsp; 
                <strong>Description:</strong> 
                    <small>${weather.weather[0].description}</small> &nbsp;
                <strong>Temperature:</strong> 
                    <small>${weather.main.temp} C</small> &nbsp;
                <strong>Wind Speed:</strong> 
                    <small>${weather.wind.speed} m/s </small> &nbsp;
                <strong>Wind degree:</strong> 
                    <small>${ Math.round(weather.wind.deg)} deg</small> &nbsp;
                </p>
            </div>
    `;
  });
  panelTo.innerHTML = toDisplay;
}


//get day of the week
function getDayOfTheWeek(x){
    let weekday = [];
    weekday[0]="Monday";
    weekday[1]="Tuesday";
    weekday[2]="Wednesday";
    weekday[3]="Thursday";
    weekday[4]="Friday";
    weekday[5]="Saturday";
    weekday[6]="Sunday";

    return weekday[x];
}


// convert to celcius
function toCelsius(f) {
    return Math.round((5/9) * (f-32));
}

// add days function prototype
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};


// filter weather data function
function getFilteredData(data) {
  // initialize  Dates format time
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  // create 5 day time from now
  let day1 = today.addDays(1);
  let day2 = today.addDays(2);
  let day3 = today.addDays(3);
  let day4 = today.addDays(4);
  let day5 = today.addDays(5);

  // initialize filtered data arrya
  let filtered = [];

  // loop through data
  data.list.forEach(weather => {
    // get weather date
    let dt = new Date(weather.dt_txt);

    // find day1
    if (dt.getDate() == day1.getDate()) {
      if (dt.getHours() == day1.getHours()) {
        filtered.push(weather);
      }
    }

    // find day2
    if (dt.getDate() == day2.getDate()) {
      if (dt.getHours() == day2.getHours()) {
        filtered.push(weather);
      }
    }
    // find day3
    if (dt.getDate() == day3.getDate()) {
      if (dt.getHours() == day3.getHours()) {
        filtered.push(weather);
      }
    }
    // find day4
    if (dt.getDate() == day4.getDate()) {
      if (dt.getHours() == day4.getHours()) {
        filtered.push(weather);
      }
    }
    // find day5
    if (dt.getDate() == day5.getDate()) {
      if (dt.getHours() == day5.getHours()) {
        filtered.push(weather);
      }
    }
  });

  return filtered;
}
