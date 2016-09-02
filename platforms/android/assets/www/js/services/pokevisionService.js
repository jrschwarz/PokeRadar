angular.module('pokeradar').factory('Pokevision', function($http, $interval) {

    var pokemonFound = [];
    var pokemonList = [];
    var pokemonFilterList = [151];

    $http.get('https://getpokemon.herokuapp.com/api/getpokemonlist').then(function(result) {
        pokemonList = result.data.pokemon;
    }, function(error) {
        console.log(error);
    });

    return {
        getNewPokemon: function(latitude, longitude) {
          return $http.get('https://getpokemon.herokuapp.com/api/getpokemon?lat='+latitude+'&lng='+longitude).then(function(response) {
                pokemonFound = response.data;
                return response.data;
          }, function(err) {
                return err;
          });
        },
        getCurPokemon: function() {
            return pokemonFound;
        },
        getAllPokemon: function() {
            return pokemonList;
        },
        filterPokemon: function(pokemonList) {
            pokemonFilterList = pokemonList;
        },
        getFilteredPokemon: function() {
            return pokemonFilterList;
        }
    };
});
