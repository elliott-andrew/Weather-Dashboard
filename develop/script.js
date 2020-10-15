// Data
// API key
var apiKey = "068008542218df571052276addfd8640"
// Current latitude
var currentLat;
// Current longitude 
var currentLon;
// Searched Cities array
var citiesSearchList = [];
// Searched City
var searchedCity = "Seattle";

// search button click event
$('#search-button').click(function (event) {
    // empty out the search field after user submits
    // prevent page from reloading
    event.preventDefault();
    // create an li element with the searched city
    var city = $("<li>").text($('#city-text').val());
    // appaend the li element to the list of previously searched cities
    citiesSearchList.push($('#city-text').val());
    // add item to local storage
    localStorage.setItem("Cities:", JSON.stringify(citiesSearchList));
    // Add latest search to top of list
    $('#city-list').prepend(city)
    // Add the latest search to the API URLs
    searchedCity = $('#city-text').val();
    // Display current weather
    renderCurrent();
    // Display five day forecast
    fiveDayForecast();
    $('#city-text').val('');
});

// Functions
// Pull five day forecast
function renderCurrent() {
    // URL for current weather data
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=${apiKey}`;

    // Pull data for current weather
    $.ajax({
        url: currentWeatherURL,
        method: "GET"
    }).then(function (response) {
        console.log("current weather", response);
        // Empty the current city section
        $("#current-city-info").empty()
        // add searched city to page
        var currentCity = $("<h2>").text(searchedCity);
        // pull current weather icon
        var weatherIcon = $("<img src='http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png' style='margin-left:10px;'/>");
        // append weather icon to city 
        currentCity.append(weatherIcon);
        // append city to page
        $("#current-city-info").append(currentCity);
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
        // pull the current longitude
        currentLon = response.coord.lon;
        // pull the current latitude
        currentLat = response.coord.lat;
        // insert both into the URL
        var uvIndexURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}`;
        // make API request
        $.ajax({
            url: uvIndexURL,
            method: "GET"
        }).then(function (uvresponse) {
            // get the current UV index
            var uvIndexNumber = $("<p>").text("UV index: " + uvresponse.value);
            // add the current UV index to the page
            $("#current-city-info").append(uvIndexNumber);
        });
    });
}

// Five Day
function fiveDayForecast() {
    // API URL
    var fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&units=imperial&cnt=5&appid=${apiKey}`;
    // make API request
    $.ajax({
        url: fiveDayForecastURL,
        method: "GET"
    }).then(function (response) {
        // add title to forecast section
        var forecastTitle = $("<h2>").text("Five Day Forecast:")
        // empty out the forcast section on click
        $("#forecast").empty();
        // add the title to the page
        $("#forecast").append(forecastTitle);
        // loop through all days
        for (let i = 0; i < response.list.length; i++) {
            // empty out the days
            $("#day-" + i).empty();
            // Pull the date
            var dateFore = $("<p>").text("Date: " + response.list[i].dt_txt.substring(0, 10));
            // add the date to the page
            $("#day-" + i).append(dateFore);
            // pull the temp
            var tempFore = $("<p>").text("Tempurature:\n" + response.list[i].main.temp + "°F");
            // add the temp to the page
            $("#day-" + i).append(tempFore);
            // pull the humidity
            var humFore = $("<p>").text("Humidity:\n" + response.list[i].main.humidity + "%");
            // add the humidity to the page
            $("#day-" + i).append(humFore);
        }
    });
}