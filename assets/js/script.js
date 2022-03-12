// Global Variables
var searchButtonEl = document.querySelector("#search-button")
var cityInputEl = document.querySelector("#city-name");




// Form submit handler function to be executed on form submission
var formSubmitHandler = function(event) {
    event.preventDefault();
    
    // get value from input element
    var cityName = cityInputEl.value.trim();

    // if a value is entered, use it in the getCityResults function & clear the input.  If nothing was entered, show alert
    if (cityName) {
        getCityResults(cityName);
        cityInputEl.value = "";
    }
    else {
        alert("Please enter a city name");
    }
};


// Request the city results from the server
var getCityResults = function(cityName) {
    
    // format the Geocoding API url
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=985c14e90aca4a530f8e1f738143f7b8";
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

    // Make a request to the Geocoding API to get lattitude & longitude of city

    // format the One Call API url (using the retrieved lattitude & longitude)
    var lat = ;
    var lon = ;
    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=" + part + "&appid=985c14e90aca4a530f8e1f738143f7b8";
    // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}




    
    // make a request to the One Call API to get weather results
    fetch(weatherUrl)
        .then(function(response) {
            // request was successful
            if (response.ok) {
                response.json().then(function(data) {
                    // send the data into the displayRepos function
                    displayRepos(data, user);
                });
            }
            else {
                alert("Error: GitHub User Not Found");
            }
        })
        .catch(function(error) {
            alert("Unable to connect to GitHub");
        });
}





// When search button is clicked, run the formSubmitHandler function
searchButtonEl.addEventListener("submit", formSubmitHandler);