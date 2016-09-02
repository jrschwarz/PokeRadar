angular.module('pokeradar').controller('MainCtrl', function($scope, $state) {

  $scope.go = function(state) {
    $state.go(state);
  };

});
