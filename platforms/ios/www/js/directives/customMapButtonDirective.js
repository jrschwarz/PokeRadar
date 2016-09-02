angular.module('pokeradar').directive('filter', function() {
  return {
    restrict: 'E',
    replace: true,
    controller: 'FilterCtrl',
    template: '<div class="filterControlDiv"><button class="button icon ion-funnel controlUI" ng-click="openFilterModal()"></button></div>'
  };
})

.directive('myLocation', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="locateControlDiv"><button class="button button-light icon ion-pinpoint controlUI" ng-click="getMyLocation()"></button></div>'
  };
})

.directive('scan', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="scanControlDiv"><button class="button controlUI" ng-click="scan()">Scan</button></div>'
  };
});
