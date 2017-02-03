app.controller('creatorController', ['$scope', '$location', 'deckService', function($scope, $location, deckService){

  //Récupération des données
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

  //initalisation nouveau deck à construire >> modifier deck
  $scope.newDeck = deckService.newDeck;

  //constantes
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

  //custom filter
  $scope.showCard = function(card) {
    if (card.arena <= $scope.arena && $scope.typeFilter.indexOf(card.type) > -1) {
      return true;
    } else {
      return false;
    }
  };

  //retourne le nom de la carte qui sera afficher
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


  //POST nouveau deck
  $scope.addDeck = function(){

    $scope.decks.unshift({
      name: $scope.newDeck.name,
      deck: $scope.newDeck.deck
    });
    $scope.newDeck.name = "";
    $scope.newDeck.deck = [];

    $location.path('/deckManager');
  };

  //ajouter carte au nouveau deck
  $scope.addCard = function(card) {
    if ($scope.newDeck.deck.length < 8 && !($scope.newDeck.deck.indexOf(card) > -1)) {
      $scope.newDeck.deck.push(card);
    }
  };

  //retirer carte au nouveau deck
  $scope.removeCard = function(card){
    var removedCard = $scope.newDeck.deck.indexOf(card);
    $scope.newDeck.deck.splice(removedCard, 1);
  };

  //PUT deck initialisation
  $scope.updateDeck = function(deck) {
    $scope.newDeck.name = deck.name;
    $scope.newDeck.deck = deck.deck;
    $scope.removeDeck(deck);
    $location.path('/deckCreator');
  }

}]);
