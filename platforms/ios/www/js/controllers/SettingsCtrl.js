angular.module('pokeradar').controller('SettingsCtrl', function($scope, $state) {

  $scope.go = function(state) {
    $state.go(state, {reload: false});
  };

});
