// Define the `phonecatApp` module
var soccerApp=angular.module('soccerApp', [
  // ...which depends on the `phoneList` module
  'ngRoute',
  'fieldList',
  'fieldDetail',
]);
soccerApp.controller("checkAlertController", function($scope) {
   $scope.ckShowAlertFail = true;
   $scope.ckShowAlertSuccess = false ;
      
   
});
