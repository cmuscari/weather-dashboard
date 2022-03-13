// Global Variables
var searchButtonEl = document.querySelector("#search-button");
var cityInputEl = document.querySelector("#city-name");




// Form submit handler function to be executed on form submission
var formSubmitHandler = function(event) {
    event.preventDefault();
    
    // get value from input element
    var cityName = cityInputEl.value.trim();
    console.log(cityName);
};




// When search button is clicked, run the formSubmitHandler function
searchButtonEl.addEventListener("click", formSubmitHandler);