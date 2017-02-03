var app = angular.module('app', ['ngRoute', 'ngAnimate']);




app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){


  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html'
    })
    .when('/deckManager', {
      templateUrl: 'views/deckManager.html',
      controller: 'deckManagerController'
    })
    .when('/deckCreator', {
      templateUrl: 'views/deckCreator.html',
      controller: 'creatorController'
    })
    .when('/cards', {
      templateUrl: 'views/cards.html',
      controller: 'cardsController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);
