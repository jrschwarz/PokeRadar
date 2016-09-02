angular.module('pokeradar').controller('MapCtrl', function($scope, Map, $compile, $ionicModal) {


  Map.init(function() {
    addScanButton();
    addMyLocationButton();
    addFilterButton();
    loadMarkers();
  });

  $scope.scan = function() {
    Map.clearMarkers();
    loadMarkers();
  };

  $scope.getMyLocation = function() {
    Map.getCurrentLocation(function(error, pos) {
      if (error) alert(error);
    });
  };

  function loadMarkers() {

    Map.loadMarkers(function(markersList) {
      console.log(markersList);
      for(var i = 0; i < markersList.length; i++) {
        var markerId = markersList[i].marker.metadata.id;
        var infoWindowContent = '<info-window name="'+markersList[i].data.name+'" despawn-time="'+markersList[i].data.expiration_time+'" marker="'+markerId+'"></div>';
        var template = $compile(infoWindowContent)($scope)[0];
        Map.addInfoWindow(markersList[i].marker, template);
      }
    });
  }

  function addScanButton() {

    var button = '<scan></scan>';
    var compiledButton = $compile(button)($scope)[0];
    Map.addOverlay(compiledButton, google.maps.ControlPosition.BOTTOM_CENTER);
  }

  function addMyLocationButton() {

    var button = '<my-location></my-location>';
    var compiledButton = $compile(button)($scope)[0];
    Map.addOverlay(compiledButton, google.maps.ControlPosition.TOP_RIGHT);
  }

  function addFilterButton() {

    var button = '<filter></filter>';
    var compiledButton = $compile(button)($scope)[0];
    Map.addOverlay(compiledButton, google.maps.ControlPosition.BOTTOM_RIGHT);
  }

});
