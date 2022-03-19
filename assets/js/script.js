// Global Variables
var searchButtonEl = document.querySelector("#search-button");
var cityInputEl = document.querySelector("#city-name");
var cityResultsEl = document.querySelector("#city-results");
var currentDate = (moment().format("M/D/YYYY"));
var forecastResultsEl = document.getElementsByClassName("card");
var searchHistoryEl = document.querySelector("#search-history");
var ButtonsEl = [];




// Form submit handler function to be executed on form submission
var formSubmitHandler = function (event) {
    event.preventDefault();

    // clear any existing city information from current weather container
    cityResultsEl.textContent = "";

    // get value from input element
    var cityName = cityInputEl.value.trim();



    
    // save new search term to the buttons array
    ButtonsEl.push(cityName);
    console.log(ButtonsEl);

    // save buttons array to local storage
    localStorage.setItem("past-searches", ButtonsEl);

    // retrieve buttons array from local storage & display
    var getPastSearches = localStorage.getItem("past-searches");

    for (var i = 0; i < getPastSearches.length; i++) {
        var historyButton = document.createElement("button");
        historyButton.textContent = getPastSearches[i];
        searchHistoryEl.appendChild(historyButton);
    }





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
                    var icon = data.current.weather[0].icon;
                    var temp = data.current.temp;
                    var wind = data.current.wind_speed;
                    var humidity = data.current.humidity;
                    var uvi = data.current.uvi;

                    // create new weather info elements in the city-results div container
                    var currentInfoEl = document.createElement("h2");
                    currentInfoEl.classList = "flex-row justify-space-between font-weight-bold";
                    currentInfoEl.innerHTML = city + "<span> (" + currentDate + ") </span>" + `<img src=http://openweathermap.org/img/w/${icon}.png />`;
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
                    else if (5 < (parseInt(uvi)) <= 7) {
                        $(currentUviEl).addClass("bg-orange");
                    }
                    else if (7 < (parseInt(uvi)) <= 10) {
                        $(currentUviEl).addClass("bg-red");
                    }
                    else if ((parseInt(uvi)) > 10) {
                        $(currentUviEl).addClass("bg-purple");
                    }

                


                    // create new weather info elements in the card div containers
                    for (var i = 1; i < 6; i++) {
                        $(forecastResultsEl).removeClass("d-none");
                        // select the forecast info to display in the card div containers 
                        var forecastDate = moment.unix(data.daily[i].dt).format("MM/DD/YYYY");
                        var forecastIcon = data.daily[i].weather[0].icon;
                        var forecastTemp = data.daily[i].temp.day;
                        var forecastWind = data.daily[i].wind_speed;
                        var forecastHumidity = data.daily[i].humidity;

                        // clear any existing city information from forecast container
                        forecastResultsEl[i-1].textContent = "";

                        var forecastInfoEl = document.createElement("h2");
                        forecastInfoEl.classList = "flex-row justify-space-between font-weight-bold";
                        forecastInfoEl.innerHTML = "<span> (" + forecastDate + ") </span>" + `<img src=http://openweathermap.org/img/w/${forecastIcon}.png />`;
                        forecastResultsEl[i-1].appendChild(forecastInfoEl);

                        // var forecastDateEl = document.createElement("h3");
                        // forecastDateEl.classList = "flex-row justify-space-between font-weight-bold";
                        // forecastDateEl.textContent = forecastDate;
                        // forecastResultsEl[i-1].appendChild(forecastDateEl);

                        var forecastTempEl = document.createElement("p");
                        forecastTempEl.classList = "flex-row justify-space-between font-weight-bold";
                        forecastTempEl.textContent = "Temp: " + forecastTemp + "°F";
                        forecastResultsEl[i-1].appendChild(forecastTempEl);
    
                        var forecastWindEl = document.createElement("p");
                        forecastWindEl.classList = "flex-row justify-space-between font-weight-bold";
                        forecastWindEl.textContent = "Wind: " + forecastWind + " MPH";
                        forecastResultsEl[i-1].appendChild(forecastWindEl);
    
                        var forecastHumidityEl = document.createElement("p");
                        forecastHumidityEl.classList = "flex-row justify-space-between font-weight-bold";
                        forecastHumidityEl.textContent = "Humidity: " + forecastHumidity + "%";
                        forecastResultsEl[i-1].appendChild(forecastHumidityEl);
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