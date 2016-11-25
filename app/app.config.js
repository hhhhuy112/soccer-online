angular.
  module('soccerApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/fields', {
          template: '<field-list></field-list>'
        }).
         when('/fields/:fieldId', {
          template: '<field-detail></field-detail>'
        }).
         when('/cities', {
          template: '<city-list></city-list>'
        }).
        otherwise('/fields');
    }
  ]);