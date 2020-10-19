// Data
// API key
var apiKey = "068008542218df571052276addfd8640"
// Current latitude
var currentLat;
// Current longitude 
var currentLon;
// Searched Cities array
var citiesSearchList = JSON.parse(localStorage.getItem("Cities")) || [];

// Functions
// search button click event
$('#search-button').click(function (event) {
    // prevent page from reloading
    event.preventDefault();
    var cityInput = $('#city-text').val()


    // appaend the li element to the list of previously searched cities

    if (citiesSearchList.indexOf(cityInput) === -1) {

        citiesSearchList.push(cityInput);
        // add item to local storage
        localStorage.setItem("Cities", JSON.stringify(citiesSearchList));
    }

    // Add the latest search to the API URLs
    searchedCity = $('#city-text').val();

    renderHistory(cityInput)
    // Display current weather
    renderCurrent(cityInput);
    // Display five day forecast
    // fiveDayForecast();
    // empty out the search field after user submits
    $('#city-text').val('');
});

function renderHistory(city) {

    // create an li element with the searched city
    var liTag = $("<li>").text(city);
    // Add latest search to top of list
    $('#city-list').prepend(liTag)
}
// Pull five day forecast
function renderCurrent(searchedCity) {
    // URL for current weather data
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=${apiKey}`;

    // Pull data for current weather
    $.ajax({
        url: currentWeatherURL,
        method: "GET"
    }).then(function (response) {
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
            var uvIndexNumber = uvresponse.value;
            console.log(uvIndexNumber)
            // add the current UV index to the page
            // check UV index
            if (uvIndexNumber >= 8) {
                // if high make color red
                var uvHigh = $('<p style="color:red;">').text("UV index: " + uvIndexNumber);
                $("#current-city-info").append(uvHigh);
            } else if (uvIndexNumber >= 3 && uvIndexNumber <= 7.99) {
                // if moderate make color yellow
                var uvModerate = $('<p style="color:yellow;">').text("UV index: " + uvIndexNumber);
                $("#current-city-info").append(uvModerate);
            } else {
                // if low make color green
                var uvLow = $('<p style="color:green;">').text("UV index: " + uvIndexNumber);
                $("#current-city-info").append(uvLow);
            }
        });

    });
    fiveDayForecast(searchedCity)
}

// Five Day
function fiveDayForecast(searchedCity) {
    // API URL
    var fiveDayForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&units=imperial&cnt=5&appid=${apiKey}`;
    // make API request
    $.ajax({
        url: fiveDayForecastURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
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
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + i + 1);
            // put date in p tag
            var dateFore = $("<p>").text("Date: " + date);
            // add the date to the page
            $("#day-" + i).append(dateFore);
            // pull the icon
            var iconFore = $("<img src='http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png' style='margin-left:10px;'/>");
            // add the icon to the page
            $("#day-" + i).append(iconFore);
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

if (citiesSearchList.length > 0) {
    renderCurrent(citiesSearchList[citiesSearchList.length - 1])
}

for (let i = 0; i < citiesSearchList.length; i++) {

    renderHistory(citiesSearchList[i])
}