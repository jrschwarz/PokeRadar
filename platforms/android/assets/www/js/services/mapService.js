angular.module('pokeradar').factory('Map', function($cordovaGeolocation, Pokevision, LoadingScreen, $compile, $rootScope){

  var map = null;
  var currentLocMarker = null;
  var markersList = [];
  var openInfoWindow = null;
  var filteredPokemonList = [151];
  var infoWindowContent = null;

  var mapStyles = [
    {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "landscape.man_made",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#F1ECCC" }
      ]
    },{
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [
        { "visibility": "on" }
      ]
    },{
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        { "visibility": "off" }
      ]
    }
  ];

  var mapOptions = {
    zoom: 15,

    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false,
    mapTypeControl: false,
    zoomControl: false,
    styles: mapStyles
  };

  function initMap(callback) {

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    LoadingScreen.show('Loading map');
    google.maps.event.addListenerOnce(map, 'idle', function(){
      LoadingScreen.hide();

      getCurrentLocation(function(error, pos) {
          if(error) alert(error);
          callback(map);
      });

    });

    google.maps.event.addListener(map, 'click', function(e) {
      if (currentLocMarker!==null) currentLocMarker.setMap(null);
      currentLocMarker = new google.maps.Marker({
        position: e.latLng,
        map: map
      });
      map.panTo(e.latLng);

    });

  }

  function loadMarkers(callback) {

    //Get all of the markers from our Markers factory
    LoadingScreen.show('Scanning');
    Pokevision.getNewPokemon(currentLocMarker.position.lat(), currentLocMarker.position.lng()).then(function(pokemon){

      // console.log("Pokemon: ", pokemon);
      // console.log(currentLocMarker);
      map.panTo(currentLocMarker.position);

      var records = pokemon;

      for (var i = 0; i < records.length; i++) {

        var record = records[i];
        var exclude = Pokevision.getFilteredPokemon();
        if(exclude[record.pokemonId]) continue;
        var markerPos = new google.maps.LatLng(record.latitude, record.longitude);

        var image = new google.maps.MarkerImage(
          record.image,
          null, /* size is determined at runtime */
          null, /* origin is 0,0 */
          null, /* anchor is bottom center of the scaled image */
          new google.maps.Size(60, 60)
        );

        // Add the markerto the map
        var marker = new google.maps.Marker({
            map: map,
            icon: image,
            animation: google.maps.Animation.DROP,
            position: markerPos
        });

        marker.metadata = {type: "pokemon", id: i};

        markersList.push({marker: marker, data: record});

      }
      callback(markersList);
      LoadingScreen.hide();

    });

  }

  function addInfoWindow(marker, template) {

      var infoWindow = new google.maps.InfoWindow({
          content: template
      });

      google.maps.event.addListener(marker, 'click', function () {
          if( openInfoWindow ) {
             openInfoWindow.close();
          }

          openInfoWindow = infoWindow;
          infoWindow.open(map, marker);
      });

  }

  function getCurrentLocation(callback) {

    var options = {enableHighAccuracy: true};

    LoadingScreen.show('Getting location');
    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        map.panTo(latLng);
        if (currentLocMarker!==null) currentLocMarker.setMap(null);
        currentLocMarker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });
        LoadingScreen.hide();

        callback(null, latLng);

    }, function(err){
      LoadingScreen.hide();
      err = "Error: Could not get location";
      callback(err, null);
    });
  }

  function addOverlay(template, position) {
    map.controls[position].push(template);
  }

  function clearMarkers() {
    for (var i = 0; i < markersList.length; i++) {
      markersList[i].marker.setMap(null);
    }
    markersList = [];
  }

  function clearMarker(id) {
    for (var i = 0; i < markersList.length; i++) {
      if (markersList[i].marker.metadata.id == id) markersList[i].marker.setMap(null);
    }
  }

  function defineInfoWindow(template) {
    infoWindowContent = template;
  }

  return {
    init: initMap,
    addOverlay: addOverlay,
    clearMarkers: clearMarkers,
    clearMarker: clearMarker,
    loadMarkers: loadMarkers,
    getCurrentLocation: getCurrentLocation,
    addInfoWindow: addInfoWindow
  };
});
