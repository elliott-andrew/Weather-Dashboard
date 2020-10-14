// This is our API key. Add your own API key between the ""
var searchedCity = "Seattle";

// URL for current weather data
var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&units=imperial&appid=068008542218df571052276addfd8640";

// Pull data for current weather
$.ajax({
    url: currentWeatherURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    // add searched city to page
    $("#current-city-info").append($("<h2>").text(searchedCity))
    // get current temp
    var currentTemp = $("<p>").text("Current temperature: " + response.main.temp + "°F");
    // add current temp to page
    $("#current-city-info").append(currentTemp)
    // get humidity
    var currentHum = $("<p>").text("Current humidity: " + response.main.humidity + "%");
    // add humidity to page
    $("#current-city-info").append(currentHum);
    // get wind speed
    var windSpeed = $("<p>").text("Wind speed: " + response.wind.speed + "MPH");
    // add wind speed to page
    $("#current-city-info").append(windSpeed);

});