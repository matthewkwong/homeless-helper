var database = firebase.database();

// Initialize and add the map
function initMap() {
  // The location of userPosition
    getLocation();
}

//Google Maps Initialization
//USER LOCATION
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
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

  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: userPosition
  });

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
