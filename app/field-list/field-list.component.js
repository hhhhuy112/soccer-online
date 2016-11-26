// Register `phoneList` component, along with its associated controller and template
angular.
  module('fieldList').
  component('fieldList', {
    templateUrl: 'field-list/field-list.template.html',
        
    controller: ['$http','$routeParams','$scope',
      function UserListController($http,$routeParams,$scope) {
      var self = this;
       var API_URL="http://soccernetworkapi-humiki.rhcloud.com"
      $http.get(API_URL+"/fields").then(function(response) {
            $scope.objects = response.data;
      });
      
      $scope.districts =[];
      $scope.showAlertSuccess=false;
      $scope.showAlertFail=false;
      $scope.latlng = [16.055656,108.196791];
      $scope.toggle = function(modalstate, id) {
            $scope.modalstate = modalstate;

            switch (modalstate) {
                    case 'add':
                          $scope.form_title = "Add Field";
                          $scope.object={
                                 fieldId : "",
                                fieldName : "Ex: Nguyen Chanh",
                                districtId : "",
                                districtName : "",
                                address : "Ex: 56 Nguyen Chanh",
                                latitude : 16.055656,
                                longitude : 108.196791,
                                phoneNumber: "",
                                districtName: "",
                          }

                        $http.get(API_URL+"/districts").then(function(response) {
                             $scope.districts = response.data;
                            $scope.valueDistrict=$scope.districts[0].districtId.toString(); 
                        });
                        $scope.latlng = [ $scope.object.latitude, $scope.object.longitude];
                          break;
                    case 'edit':
                          $scope.form_title = "Field Infomation";
                          $scope.id = id;
                          $http.get(API_URL+"/districts").then(function(response) {
                            $scope.districts = response.data;
                          });
                          $http.get(API_URL+ '/fields/' + id)
                          .success(function(response) {
                                $scope.object = response;
                                $scope.valueDistrict=$scope.object.districtId.toString();
                                 $scope.latlng = [ $scope.object.latitude, $scope.object.longitude];        
                          });
                          break;
                    default:
                          break;
            }
           
      }
      $scope.changeValueDistrict=function(){
          

      };
      
      $scope.getpos = function(event){
            $scope.latlng = [event.latLng.lat(), event.latLng.lng()];
            $scope.object.latitude=$scope.latlng[0]; 
            $scope.object.longitude=$scope.latlng[1];
      };
       //Lưu record mới / update record
       $scope.saveRecord = function(modalstate, id) {
            var url = API_URL + "/fields";
            var method="POST";
            if (modalstate === 'edit') {
                  method="PUT";
            }
             $http({
                   url: url,
                    method: method,
                    data: {
                      "fieldId": id,
                      "fieldName": $scope.object.fieldName,
                      "districtId": $scope.valueDistrict,
                      "address": $scope.object.address,
                      "latitude": $scope.object.latitude,
                      "longitude": $scope.object.longitude,
                      "phoneNumber": $scope.object.phoneNumber
                    },
                    headers: {"Content-Type": "application/json"}
             }).success(function(response) {
                    $scope.result(response.data);   
             }).error(function(response) {
                   alert('Đã xảy ra lỗi. Vui lòng kiểm tra log để biết chi tiết');
                    console.log(response);
             });

      }
   
      $scope.resetData=function(id){
          $http.get(API_URL+"/fields").then(function(response) {
              $scope.objects = response.data;
          });
      }
      $scope.comfirmDelete=function(id){
          $scope.idDelete=id;
      }
      $scope.deleteObject=function(id){
            $http.delete(API_URL + "/fields/"+id).then(function(response) {
                  $scope.result(response.data);   
                  
            });
      };

      $scope.result=function(result){
              if(result["status"]==="success"){
                   $scope.showAlertSuccess=true;
                   $scope.showAlertFail=false;
                  
              }else{
                   $scope.showAlertSuccess=false;
                   $scope.showAlertFail=true;
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