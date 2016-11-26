// Register `phoneList` component, along with its associated controller and template
angular.
  module('districtList').
  component('districtList', {
    templateUrl: 'district-list/district-list.template.html',
        
    controller: ['$http','$routeParams','$scope',
      function DistrictListController($http,$routeParams,$scope) {
      var self = this;
       var API_URL="http://soccernetworkapi-humiki.rhcloud.com"
      $http.get(API_URL+"/districts").then(function(response) {
            $scope.objects = response.data;
      });
      $scope.showAlertSuccess=false;
      $scope.showAlertFail=false;
       $scope.toggle = function(modalstate, id) {
            $scope.modalstate = modalstate;
            switch (modalstate) {
                    case 'add':
                          $scope.form_title = "Add District";
                          $scope.object={
                                    districtId : "",
                                    districtCode : "",
                                    districtName : "",
                                    cityId : "",
                                    cityName : "",
                          }
                          $http.get(API_URL+"/cities").then(function(response) {
                             $scope.cities = response.data;
                             $scope.valueCity=$scope.cities[0].id.toString();  
                        });
                          
                          break;
                    case 'edit':
                          $scope.form_title = "District Infomation";
                          $scope.id = id;
                           $http.get(API_URL+"/cities").then(function(response) {
                             $scope.cities = response.data;
                        });
                          $http.get(API_URL+ '/districts/' + id)
                          .success(function(response) {
                                $scope.object = response;
                                $scope.valueCity=$scope.object.cityId.toString();
                          });
                          break;
                    default:
                          break;
            }
           
      }
       //Lưu record mới / update record
       $scope.saveRecord = function(modalstate, id) {
             
             var url = API_URL + "/districts";
            var method="POST";
            if (modalstate === 'edit') {
                  method="PUT";
            }
             $http({
                   url: url,
                    method: method,
                    data: { 
                      "districtId": id,
                      "districtCode" :  $scope.object.districtCode, 
                      "districtName" : $scope.object.districtName,
                      "cityId":$scope.valueCity
                   },
                    headers: {"Content-Type": "application/json"}
             }).success(function(response) {
                  $scope.result(response);   
             }).error(function(response) {
             });

      }
     
      $scope.resetData=function(id){
          $http.get(API_URL+"/districts").then(function(response) {
              $scope.objects = response.data;
          });
      }
      $scope.comfirmDelete=function(id){
          $scope.idDelete=id;
      }
      $scope.deleteObject=function(id){
            $http.delete(API_URL + "/districts/"+id).then(function(response) {
                  $scope.result(response);   
            });
      };

      $scope.result=function(rs){
              if(rs["status"]==="success"){
                 $scope.showAlertSuccess=true;
                   $scope.showAlertFail=false;
                  
              }else{
                   $scope.showAlertSuccess=true;
                   $scope.showAlertFail=false;
              }
            $scope.resetData(); 
            $scope.btnCancel();   
            
      };
      $scope.btnCancel=function(){
          $('.modal').modal('hide');         
      }
    }

    ]

  });