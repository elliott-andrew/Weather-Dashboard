// This is our API key. Add your own API key between the ""
var searchedCity = "Seattle";
var apiKey = "068008542218df571052276addfd8640"
// URL for current weather data
var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=${apiKey}`;
var fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${searchedCity}&units=imperial&cnt=5&appid=${apiKey}`;
// var uvIndex = `http://api.openweathermap.org/data/2.5/uvi?lat=" + currentLat + "&lon=" + currentLon + "&appid=${apiKey}`;

var currentLat;
var currentLon;
var citiesSearchList = [];
console.log(citiesSearchList);

// search button click event
$('#search-button').click(function (event) {
    // prevent page from reloading
    event.preventDefault();
    // create an li element with the searched city
    var city = $("<li>").text($('#city-text').val());
    // appaend the li element to the list of previously searched cities
    citiesSearchList.push($('#city-text').val());
    $('#city-list').append(city)
    console.log(citiesSearch)
});


// $(function storeCity() {
//     // Stringify and set "cities" key in localStorage to cities array
//     localStorage.setItem("citiesSearch", JSON.stringify(citiesSearch));
// })

// Pull five day forecast
$.ajax({
    url: fiveDayForecastURL,
    method: "GET"
}).then(function (response) {
    console.log("five day", response);
});


// Pull data for current weather
$.ajax({
    url: currentWeatherURL,
    method: "GET"
}).then(function (response) {
    console.log("current city: ", response);
    // add searched city to page
    $("#current-city-info").append($("<h2>").text(searchedCity));
    // get current temp
    var currentTemp = $("<p>").text("Current temperature: " + response.main.temp + "°F");
    // add current temp to page
    $("#current-city-info").append(currentTemp);
    // get humidity
    var currentHum = $("<p>").text("Current humidity: " + response.main.humidity + "%");
    // add humidity to page
    $("#current-city-info").append(currentHum);
    // get wind speed
    var windSpeed = $("<p>").text("Wind speed: " + response.wind.speed + "MPH");
    // add wind speed to page
    $("#current-city-info").append(windSpeed);
    currentLon = response.coord.lon;
    currentLat = response.coord.lat;

});

