// Register `phoneList` component, along with its associated controller and template
angular.
  module('fieldList').
  component('fieldList', {
    templateUrl: 'field-list/field-list.template.html',
        
    controller: ['$http','$routeParams','$scope',
      function FieldListController($http,$routeParams,$scope) {
            var self = this;

      $http.get('fields/fields.json').then(function(response) {
            $scope.fields = response.data;
      });
      $scope.viewField=function(id){
            $scope.id=id;
            $http.get('fields/' + $scope.id + '.json').then(function(response) {
                  $scope.field = response.data;
            });
            $http.get('fields/city.json').then(function(response) {
                  self.cities = response.data;
            });
            $http.get('fields/district.json').then(function(response) {
                  self.districts = response.data;
            });
      };

      $scope.updateField = function (){
            $http({
                    method: 'POST',
                    url: 'http://example.com',
                    headers: {
                           'Content-Type': undefined
                    },
                   data: $.param($scope.field),
            }).then(function successCallback(response) {
                        // this callback will be called asynchronously
                        // when the response is available
            }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
            });  
      };
      $scope.comfirmDelete=function(id){
          $scope.idDelete=id;
      }
      $scope.deleteField=function(){
            $http.get('fields/' + $scope.idDelete + '.json').then(function(response) {
                  $scope.field = response.data;
            });
      };


      $scope.btnCancel=function(){
            
      }
    }

    ]

  });