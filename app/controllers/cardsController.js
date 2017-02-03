app.controller('cardsController', ['$scope', '$location', 'deckService', function($scope, $location, deckService){


  //Récupération des infos
  $scope.cards = false;

  deckService.getCards().then(function(response){
    $scope.cards = response;
  }, function(error){
    console.error(error);
  });

  
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

}]);
