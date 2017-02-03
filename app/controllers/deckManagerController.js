app.controller('deckManagerController', ['$scope', '$location', 'deckService', function($scope, $location, deckService){


  //Récupérer les données
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

  //retourne le prix de la carte qui sera affiché dans son coin en haut à gauche
  $scope.findElixir = function(cardInput){
    var elixir = "";
    angular.forEach($scope.cards, function(card){
      if (card.name == cardInput) {
        elixir = card.elixir;
      }
    });
    return elixir;
  };

  //DELETE deck
  $scope.removeDeck = function(deck){
    var removedDeck = $scope.decks.indexOf(deck);
    $scope.decks.splice(removedDeck, 1);
  };

  //PUT deck
  $scope.updateDeck = function(deck) {
    $scope.newDeck.name = deck.name;
    $scope.newDeck.deck = deck.deck;
    $scope.removeDeck(deck);
    $location.path('/deckCreator');
  }

}]);
