angular.module('pokeradar').factory('LoadingScreen', function($ionicLoading){
  var show = function(text) {
    $ionicLoading.show({
      template: text+'...'
    });
  };
  var hide = function(){
    $ionicLoading.hide();
  };

  return {
    show: show,
    hide: hide
  };
});
