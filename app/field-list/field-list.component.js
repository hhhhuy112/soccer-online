// Register `phoneList` component, along with its associated controller and template
angular.
  module('fieldList').
  component('fieldList', {
    templateUrl: 'field-list/field-list.template.html',
        
    controller: function FieldListController($http) {
      var self = this;

      $http.get('fields/fields.json').then(function(response) {
        self.fields = response.data;
      });
    }
  });