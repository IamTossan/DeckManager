var myCRDeckApp = angular.module('myCRDeckApp', ['ngRoute', 'ngAnimate']);




myCRDeckApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){


  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html'
    })
    .when('/deckManager', {
      templateUrl: 'views/deckManager.html',
      controller: 'DeckController'
    })
    .when('/deckCreator', {
      templateUrl: 'views/deckCreator.html',
      controller: 'DeckController'
    })
    .when('/cards', {
      templateUrl: 'views/cards.html',
      controller: 'DeckController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);


myCRDeckApp.factory('deckService', ['$http', '$q', function($http, $q){
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
    }

  }
  return factory;

  DeckService.newDeck = {
    name: "",
    deck: []
  };

}]);


myCRDeckApp.controller('DeckController', ['$scope', '$location', 'deckService', function($scope, $location, deckService){


  $scope.cards = false;
  $scope.decks = false;

  deckService.getCards().then(function(response){
    $scope.cards = response;
  }, function(error){
    console.error(error);
  });

  deckService.getDecks().then(function(response){
    $scope.decks = response;
  }, function(error){
    console.error(error);
  });

  $scope.newDeck = deckService.newDeck;
  $scope.arenaName = [
    "Training Camp",
    "Arena 1",
    "Arena 2",
    "Arena 3",
    "Arena 4",
    "Arena 5",
    "Arena 6",
    "Arena 7",
    "Arena 8",
    "Legendary Arena"
  ];

  $scope.typeFilter = ["troop", "spell", "building"];

  $scope.showCard = function(card) {
    if (card.arena <= $scope.arena && $scope.typeFilter.indexOf(card.type) > -1) {
      return true;
    } else {
      return false;
    }
  };

  $scope.findThumb = function(cardInput){
    var thumb = "";
    angular.forEach($scope.cards, function(card){
      if (card.name == cardInput) {
        thumb = card.thumb;
      }
    });
    return thumb;
  };

  $scope.findElixir = function(cardInput){
    var elixir = "";
    angular.forEach($scope.cards, function(card){
      if (card.name == cardInput) {
        elixir = card.elixir;
      }
    });
    return elixir;
  };

  $scope.addDeck = function(){

    $scope.decks.unshift({
      name: $scope.newDeck.name,
      deck: $scope.newDeck.deck
    });
    $scope.newDeck.name = "";
    $scope.newDeck.deck = [];

    $location.path('/deckManager');
  };

  $scope.removeDeck = function(deck){
    var removedDeck = $scope.decks.indexOf(deck);
    $scope.decks.splice(removedDeck, 1);
  };

  $scope.addCard = function(card) {
    if ($scope.newDeck.deck.length < 8 && !($scope.newDeck.deck.indexOf(card) > -1)) {
      $scope.newDeck.deck.push(card);
    }
  };

  $scope.removeCard = function(card){
    var removedCard = $scope.newDeck.deck.indexOf(card);
    $scope.newDeck.deck.splice(removedCard, 1);
  };

  $scope.updateDeck = function(deck) {
    $scope.newDeck.name = deck.name;
    $scope.newDeck.deck = deck.deck;
    $scope.removeDeck(deck);
    $location.path('/deckCreator');
  }

}]);
