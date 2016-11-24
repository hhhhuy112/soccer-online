angular.
  module('fieldDetail').
  component('fieldDetail', {
    templateUrl: 'field-detail/field-detail.template.html',
    controller: ['$http', '$routeParams',
      function FieldDetailController($http, $routeParams) {
        var self = this;

        $http.get('fields/' + $routeParams.fieldId + '.json').then(function(response) {
          self.field = response.data;
          self.field_id=self.field.field_id
          self.field_name=self.field.field_name
          self.address=self.field.address
          self.city_id=self.field.city.city_id
          self.district_id=self.field.district.district_id
          self.latitude=self.field.latitude
          self.longtude=self.field.longtude
          self.phone_number=self.field.phone_number
        });
         $http.get('fields/city.json').then(function(response) {
          self.cities = response.data;
        });
          $http.get('fields/district.json').then(function(response) {
          self.districts = response.data;
        });
      }
    ]
  });

  