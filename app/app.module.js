// Define the `phonecatApp` module
var soccerApp=angular.module('soccerApp', [
  // ...which depends on the `phoneList` module
  'ngRoute',
  'fieldList',
  'cityList',
  'userList',

]);
soccerApp.controller("checkAlertController", function($scope) {
   $scope.ckShowAlertSuccess =true;
   $scope.ckShowAlertFail = true ;
});
