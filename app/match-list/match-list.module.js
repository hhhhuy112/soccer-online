// Define the `phoneList` module
var  matchList=angular.module('matchList', ['ui.bootstrap', 'ngMap']).controller('ModalDemoCtrl', function ($scope, $modal, $log) {

  $scope.geopos = {lat:16.085034,lng:108.151492};

    
  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      scope: $scope,
      resolve: {
        lat: function () {
          return $scope.geopos.lat;
        },
        lng: function () {
          return $scope.geopos.lng;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

matchList.controller('ModalInstanceCtrl', function ($scope, $modalInstance, lat, lng) {

  $scope.geopos.lat = lat;
  $scope.geopos.lng = lng;
  
  $scope.render = true;
  $scope.validation_text = "";
  
  $scope.$on('mapInitialized', function(evt, evtMap) {
  $scope.map = evtMap;
  $scope.marker = new google.maps.Marker({position: evt.latLng, map: $scope.map});
  $scope.click = function(evt) {
    var latitude = evt.latLng.lat().toPrecision(8);
    var longitude = evt.latLng.lng().toPrecision(8);
    $scope.validation_text = "";
    $scope.marker.setPosition(evt.latLng);
    $scope.map.panTo(evt.latLng);
    $scope.map.setZoom(15);
    $scope.geopos.lat = latitude;
    $scope.geopos.lng = longitude;         
    }
  });

  $scope.ok = function () {
    $modalInstance.close();
  };

});
