// Global Variables
var searchButtonEl = document.querySelector("#search-button");
var cityInputEl = document.querySelector("#city-name");
var cityResultsEl = document.querySelector("#city-results");
var currentDate = (moment().format("M/D/YYYY"));
var forecastResultsEl = document.getElementsByClassName("card");





// Form submit handler function to be executed on form submission
var formSubmitHandler = function (event) {
    event.preventDefault();

    // clear any existing city information from right side of screen
    cityResultsEl.textContent = "";
    forecastResultsEl.textContent = "";

    // get value from input element
    var cityName = cityInputEl.value.trim();

    // if a value is entered, use it in the getCityResults function & clear the input.  If nothing was entered, show alert
    if (cityName) {
        getCityResults(cityName);
        cityInputEl.value = "";
        return (cityName);
    }
    else {
        alert("Please enter a city name");
    }
};







// Request the city results from the server
var getCityResults = function (cityName) {
    // format the Geocoding API url
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=985c14e90aca4a530f8e1f738143f7b8";
    // Make a request to the Geocoding API to get lattitude & longitude of city
    fetch(geoUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    // select the lat & long data & send them into the getWeatherResults function
                    var lat = data[0].lat;
                    var lon = data[0].lon;
                    var city = cityName;
                    getWeatherResults(lat, lon, city);
                })
            }
            else {
                alert("Error: City Not Found");
            }
        })
        .catch(function(error) {
            alert("Error: Unable to connect to One Call Weather");
        });
}




// Request weather results from the server
var getWeatherResults = function (lat, lon, city) {
    // format the One Call API url (using the retrieved lattitude & longitude)
    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=985c14e90aca4a530f8e1f738143f7b8";
    // make a request to the One Call API to get weather results
    fetch(weatherUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    
                    // select the weather info to display in the city-results div container 
                    console.log(data);
                    var icon = data.current.weather.icon;
                    var iconImage = $("<img>").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
                    var temp = data.current.temp;
                    var wind = data.current.wind_speed;
                    var humidity = data.current.humidity;
                    var uvi = data.current.uvi;

                    // create new weather info elements in the city-results div container
                    var currentInfoEl = document.createElement("h2");
                    currentInfoEl.classList = "flex-row justify-space-between font-weight-bold";
                    currentInfoEl.textContent = city + " (" + currentDate + ")  " + iconImage;
                    cityResultsEl.appendChild(currentInfoEl);

                    var currentTempEl = document.createElement("p");
                    currentTempEl.classList = "flex-row justify-space-between font-weight-bold";
                    currentTempEl.textContent = "Temp: " + temp + "°F";
                    cityResultsEl.appendChild(currentTempEl);

                    var currentWindEl = document.createElement("p");
                    currentWindEl.classList = "flex-row justify-space-between font-weight-bold";
                    currentWindEl.textContent = "Wind: " + wind + " MPH";
                    cityResultsEl.appendChild(currentWindEl);

                    var currentHumidityEl = document.createElement("p");
                    currentHumidityEl.classList = "flex-row justify-space-between font-weight-bold";
                    currentHumidityEl.textContent = "Humidity: " + humidity + "%";
                    cityResultsEl.appendChild(currentHumidityEl);

                    var currentUviEl = document.createElement("p");
                    currentUviEl.classList = "flex-row justify-space-between font-weight-bold";
                    currentUviEl.textContent = "UV Index: " + uvi;
                    cityResultsEl.appendChild(currentUviEl);
                    
                    // apply background colors to uvi value 
                    if ((parseInt(uvi)) <= 2) {
                        $(currentUviEl).addClass("bg-green");
                    }
                    else if (2 < (parseInt(uvi)) <= 5) {
                        $(currentUviEl).addClass("bg-yellow");
                    }
                    else if (5 < (parseInt(uvi)) <=7) {
                        $(currentUviEl).addClass("bg-orange");
                    }







                    // select the forecast info to display in the card div containers 
                    console.log(data);

                    var forecastDate = (moment().add([i]+1, 'days').format("M/D/YYYY"))._d;
                    var forecastTemp = data.daily[i].temp.day;
                    var forecastWind = data.daily[i].wind_speed;
                    var forecastHumidity = data.daily[i].humidity;

                    // create new weather info elements in the card div containers
                    for (var i = 0; i < 5; i++) {
                        var forecastDateEl = document.createElement("h3");
                        forecastDateEl.classList = "flex-row justify-space-between font-weight-bold";
                        forecastDateEl.textContent = forecastDate;
                        forecastResultsEl.appendChild(forecastDateEl);

                        var forecastTempEl = document.createElement("p");
                        forecastTempEl.classList = "flex-row justify-space-between font-weight-bold";
                        forecastTempEl.textContent = "Temp: " + forecastTemp + "°F";
                        forecastResultsEl.appendChild(forecastTempEl);
    
                        var forecastWindEl = document.createElement("p");
                        forecastWindEl.classList = "flex-row justify-space-between font-weight-bold";
                        forecastWindEl.textContent = "Wind: " + forecastWind + " MPH";
                        forecastResultsEl.appendChild(forecastWindEl);
    
                        var forecastHumidityEl = document.createElement("p");
                        forecastHumidityEl.classList = "flex-row justify-space-between font-weight-bold";
                        forecastHumidityEl.textContent = "Humidity: " + forecastHumidity + "%";
                        forecastResultsEl.appendChild(forecastHumidityEl);
                    }
                })
            }
            else {
                alert("Error: City Not Found");
            }
        })
        .catch(function(error) {
            alert("Error: Unable to connect to One Call Weather");
        });
}










// When search button is clicked, run the formSubmitHandler function
searchButtonEl.addEventListener("click", formSubmitHandler);