var database = firebase.database();

var locations = database.ref('locations/');

locations.once('value').then(function(snapshot) {console.log(snapshot.val())})


//Google Maps Initialization
//USER LOCATION
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  console.log(lat);
  console.log(long);
  var userPosition = {
    lat: lat,
    lng: long
  };
 // The map, centered at userPosition
  var map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 15,
      center: userPosition,
    });
 // The marker, positioned at userPosition
  var marker = new google.maps.Marker({position: userPosition, map: map});
}

// Initialize and add the map
function initMap() {
  // The location of userPosition
  getLocation();
}
