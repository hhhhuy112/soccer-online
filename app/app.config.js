angular.
  module('soccerApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/fields', {
          template: '<field-list></field-list>'
        }).
         when('/cities', {
          template: '<city-list></city-list>'
        }).
          when('/users', {
          template: '<user-list></user-list>'
        }).
        otherwise('/fields');
    }
  ]);