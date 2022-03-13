// Global Variables
var searchButtonEl = document.querySelector("#search-button");
var cityInputEl = document.querySelector("#city-name");
var cityResultsEl = document.querySelector("#city-results");
var currentDate = (moment().format("M/D/YYYY"));





// Form submit handler function to be executed on form submission
var formSubmitHandler = function (event) {
    event.preventDefault();

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
                    var temp = data.current.temp;
                    var wind = data.current.wind_speed;
                    var humidity = data.current.humidity;
                    var uvi = data.current.uvi;

                    // create new weather info elements in the city-results div container
                    var currentInfoEl = document.createElement("h2");
                    currentInfoEl.classList = "flex-row justify-space-between font-weight-bold";
                    currentInfoEl.textContent = city + " (" + currentDate + ")";
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