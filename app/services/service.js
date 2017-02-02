app.factory('deckService', ['$http', '$q', function($http, $q){
  var factory = {
    decks: false,
    cards: false,

    getDecks: function(){
      var deferred = $q.defer();

      if(factory.decks !== false){
        deferred.resolve(factory.decks);
      } else{
        $http.get('data/decks.json').then(function(response){
          factory.decks = response.data;
          deferred.resolve(response.data);
        }, function(error){
          console.log('error : get decks.json');
          deferred.reject(error);
        });

      }
      return deferred.promise;
    },

    getCards: function(){
      var deferred = $q.defer();

      if(factory.cards !== false){
        deferred.resolve(factory.cards);
      } else{
        $http.get('data/cards.json').then(function(response){
          factory.cards = response.data;
          deferred.resolve(response.data);
        }, function(error){
          console.log('error : get cards.json');
          deferred.reject(error);
        });

      }
      return deferred.promise;
    },

    newDeck: {
      name: "",
      deck: []
    }

  }
  return factory;



}]);
