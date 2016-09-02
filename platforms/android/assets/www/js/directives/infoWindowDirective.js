angular.module('pokeradar').directive('infoWindow', function($compile, $interval, Map) {

  function getTimeRemaining(endtime){
    var t = new Date(endtime).getTime() - new Date().getTime();
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  return {
    scope: {
      name: '@name',
      despawnTime: '&despawnTime'
    },
    replace: true,
    restrict: 'EA',
    template: '<div class="infoWindowContent"><h5>{{name}}</h5><h6 id="expiration">{{despawnTimer.minutes}}:{{despawnTimer.seconds}}</h6></div>',
    link: function(scope, elem, attrs) {
      scope.despawnTime = new Date(attrs.despawnTime*1000).toString('hh:mm tt');
      var timerEnd = attrs.despawnTime*1000;

      var timer = $interval(function(){
        scope.despawnTimer = getTimeRemaining(timerEnd);
        if(scope.despawnTimer.total<=0){
          scope.despawnTimer.total = 0;
          Map.clearMarker(attrs.marker);
          $interval.cancel(timer);
        }
      },1000);
    }
  };
});
