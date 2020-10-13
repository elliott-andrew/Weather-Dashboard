// This is our API key. Add your own API key between the ""
var searchedCity = "Seattle";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&units=imperial&appid=068008542218df571052276addfd8640";

// We then created an AJAX call
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(queryURL);
    console.log(response);
    console.log(response.main.temp);
});