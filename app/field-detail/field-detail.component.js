angular.
  module('fieldDetail').
  component('fieldDetail', {
    templateUrl: 'field-detail/field-detail.template.html',
    controller: ['$http', '$routeParams','$scope',
      function FieldDetailController($http, $routeParams,$scope) {
        var self = this;
        $http.get('fields/' + $routeParams.fieldId + '.json').then(function(response) {
          $scope.field = response.data;

        });
         $http.get('fields/city.json').then(function(response) {
          self.cities = response.data;
        });
          $http.get('fields/district.json').then(function(response) {
          self.districts = response.data;
        });
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
     
      }
    ]

  });

  