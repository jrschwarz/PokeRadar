angular.module('pokeradar').controller('FilterCtrl', function($scope, $ionicModal, Pokevision) {

  $ionicModal.fromTemplateUrl('templates/filterModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.pokemonList = null;
  $scope.filteredPokemonList = Pokevision.getFilteredPokemon();

  $scope.pokemonList = Pokevision.getAllPokemon();

   $scope.openFilterModal = function() {
     $scope.modal.show();
   };

   $scope.closeFilterModal = function() {
     $scope.modal.hide();
   };

   $scope.filterOut = function(id) {
     if($scope.filteredPokemonList[id]) $scope.filteredPokemonList[id] = 0;
     else $scope.filteredPokemonList[id] = 1;

     Pokevision.filterPokemon($scope.filteredPokemonList);
   };

   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });

   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });

   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });
});
