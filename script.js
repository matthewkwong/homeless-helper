var database = firebase.database();
// var map = null;
// var locations = database.ref('userPosition/lat');
// locations.once('value').then(function(snapshot) {console.log(snapshot.val())})


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

// Get a key for a new Post.
  var newPostKey = firebase.database().ref("/userPosition").push(userPosition).key;

  // Write the new user location data.
  var updates = {};
  updates['/posts/' + newPostKey] = userPosition;


  var map = new google.maps.Map(
    document.getElementById('map'), {
      zoom: 15,
      center: userPosition,
    });


 // The marker, positioned at userPosition
  var marker = new google.maps.Marker({position: userPosition, map: map});
  database.ref('userPosition').once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {

      var userCoords = childSnapshot.val();
      console.log(userCoords);


      //Making new Google Map pins for every location
      var newPin = new google.maps.Marker({
        map: map,
        position: userCoords
      });
    });
  });



  return firebase.database().ref().update(updates);
}

// Initialize and add the map
function initMap() {
  // The map, centered at userPosition

  // The location of userPosition
  getLocation();




  // var latitude = database.ref('userPosition');
  // var longitude = database.ref('userPosition');
  //



    // getLocation();
}
