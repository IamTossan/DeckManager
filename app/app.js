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


myCRDeckApp.service('deckService', ['$http', function($http){
  var DeckService = this;

  /*$http.get('data/decks.json').success(function(data){
    DeckService.decks = data;
  });*/
  DeckService.decks = [
    {
      "name": "deck 1",
      "deck": ["Arrow", "Bomber", "Archers", "Knight", "Musketeer", "Tombstone", "Prince", "Fireball"]
    },
    {
      "name": "deck 2",
      "deck": ["Arrow", "Mini P.E.K.K.A", "Bomb Tower", "Goblins", "Minions", "Giant", "Witch", "Fireball"]
    },
    {
      "name": "deck 3",
      "deck": ["Giant", "Bomber", "Archers", "Mini P.E.K.K.A", "Spear Goblins", "Goblin Hut", "Prince", "Fireball"]
    }
  ];


  DeckService.newDeck = {
    name: "",
    deck: []
  };

}]);


myCRDeckApp.controller('DeckController', ['$scope', '$http', '$location', 'deckService', function($scope, $http, $location, deckService){


  $http.get('data/cards.json').success(function(data){
    $scope.cards = data;
  });


  $scope.decks = deckService.decks;
  $scope.newDeck = deckService.newDeck;
  $scope.arenaName = [
    "Training Camp",
    "Arena 1 : Goblin Stadium",
    "Arena 2 : Bone Pit",
    "Arena 3 : Barbarian Bowl",
    "Arena 4 : P.E.K.K.A's Playhouse",
    "Arena 5 : Spell Valley",
    "Arena 6 : Builder's Workshop",
    "Arena 7 : Royal Arena",
    "Arena 8 : Frozen Peak",
    "Arena 9 : Legendary Arena"
  ];

  $scope.findThumb = function(cardInput){
    var thumb = "";
    angular.forEach($scope.cards, function(card){
      if (card.name == cardInput) {
        thumb = card.thumb;
      }
    });
    return thumb;
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
    if ($scope.newDeck.deck.length < 8 && !$scope.newDeck.deck.includes(card)) {
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
