// Register `phoneList` component, along with its associated controller and template
angular.
  module('cityList').
  component('cityList', {
    templateUrl: 'city-list/city-list.template.html',
        
    controller: ['$http','$routeParams','$scope',
      function CityListController($http,$routeParams,$scope) {
      var self = this;
       var API_URL="http://soccernetworkapi-humiki.rhcloud.com"
      $http.get(API_URL+"/cities").then(function(response) {
            $scope.objects = response.data;
      });
      
       $scope.toggle = function(modalstate, id) {
            $scope.modalstate = modalstate;
            switch (modalstate) {
                    case 'add':
                          $scope.form_title = "Add City";
                          $scope.object={
                                id : "",
                                cityCode : "",
                                cityName : "",
                          }
                          break;
                    case 'edit':
                          $scope.form_title = "City Infomation";
                          $scope.id = id;
                          $http.get(API_URL+ '/cities/' + id)
                          .success(function(response) {
                                $scope.object = response;
                          });
                          break;
                    default:
                          break;
            }
           
      }
       //Lưu record mới / update record
       $scope.saveRecord = function(modalstate, id) {
            var url = API_URL + "/cities";
            if (modalstate === 'edit') {
                  url += "/" + id;
            }
             $http({
                   url: url,
                    method: "POST",
                    data: { 
                      "cityCode" : "asdasd2020", 
                      "cityName" : "asdasd"
                   },
                    headers: {"Content-Type": "application/json"}
             }).success(function(response) {
                   console.log(response);
                   location.reload();
             }).error(function(response) {
                   alert('Đã xảy ra lỗi. Vui lòng kiểm tra log để biết chi tiết');
                    console.log(response);
             });

      }

   

   

     
      $scope.comfirmDelete=function(id){
          $scope.idDelete=id;
      }
      $scope.deleteCity=function(){
            $http.get('fields/' + $scope.idDelete + '.json').then(function(response) {
                  
            });
      };


      $scope.btnCancel=function(){
          $('#myModal').modal('hide');         
      }
    }

    ]

  });