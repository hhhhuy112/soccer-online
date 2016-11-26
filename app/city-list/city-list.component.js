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
      $scope.showAlertSuccess=false;
      $scope.showAlertFail=false;
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
            var method="POST";
            if (modalstate === 'edit') {
                  method="PUT";
            }
             $http({
                   url: url,
                    method: method,
                    data: { 
                      "id": id,
                      "cityCode" :  $scope.object.cityCode, 
                      "cityName" : $scope.object.cityName
                   },
                    headers: {"Content-Type": "application/json"}
             }).success(function(response) {
                  $scope.result(response);   
             }).error(function(response) {
             });

      }
     
      $scope.resetData=function(id){
          $http.get(API_URL+"/cities").then(function(response) {
              $scope.objects = response.data;
          });
      }
      $scope.comfirmDelete=function(id){
          $scope.idDelete=id;
      }
      $scope.deleteObject=function(id){
             alert(id);
            $http.delete(API_URL + "/cities/"+id).then(function(response) {
                  $scope.result(response);   
            });
      };

      $scope.result=function(rs){
              alert(rs["status"]);
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