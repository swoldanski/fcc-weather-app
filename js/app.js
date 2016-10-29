var info = function info(msg, element) {
    var id = element || "err";
    var err = window.document.getElementById(id);
    err.innerText = msg;
};

var image = function info(url, alt, element) {
    var id = element || "icon";
    var image = window.document.getElementById(id);
    image.src = url;
    image.alt = alt;
};

var reqListener = function reqListener () {
  var weather = JSON.parse(this.responseText);
  if (weather){
      var button = document.getElementById("units");
      var units = (button.innerText == "metric") ? " °C" : " °F";
      button.innerText = (button.innerText == "imperial") ? "metric" : "imperial";
      
      info(weather.name + ', ' + weather.sys.country, "city");
      info(weather.main.temp + units, "temp");
      image("http://openweathermap.org/img/w/"+weather.weather[0].icon+".png", weather.weather[0].main, "icon");
      info("");
  }
  else {
      /* error */
      info("API call error...");
  }
  

}

var getWheatherInfo = function getWheatherInfo(lat, lon, units){
    var units = units || "metric";
    info(lat + ', ' + lon);
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat="
    +String(lat)
    +"&lon="
    +String(lon)
    +"&appid=78e19d363676b6092791109b7bf969ae"
    +"&units="+String(units));
    oReq.send();
    
};

var changeDisplayUnits = function changeDisplayUnits() {
    var units = this.innerText;
    processData(units);
    
}

var processData = function processData(units) {
    if ("geolocation" in navigator) {
        /* geolocation is available */
        info("Looking for your geolocation data... Please wait...");

        navigator.geolocation.getCurrentPosition( function(position){
            /* we have geo data */
            info("Get weather data for your location...");
            getWheatherInfo(position.coords.latitude, position.coords.longitude, units);

        }, function() {
            info("Sorry, no position available.");
        })

    } else {
        /* geolocation IS NOT available */

        info("Sorry, geolocation IS NOT available...");
    }
}
window.onload = function () {
    document.getElementById("units").onclick = changeDisplayUnits;
    
    processData(document.getElementById("units").innerText);
};

