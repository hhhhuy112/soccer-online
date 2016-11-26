// Register `phoneList` component, along with its associated controller and template
angular.
  module('matchList').
  component('matchList', {
    templateUrl: 'match-list/match-list.template.html',
        
    controller: ['$http','$routeParams','$scope', '$rootScope',
      function UserListController($http,$routeParams,$scope) {
      var self = this;
       var API_URL="http://soccernetworkapi-humiki.rhcloud.com"
      $http.get(API_URL+"/matches").then(function(response) {
            $scope.objects = response.data;
      });
        $scope.isAdmin=true; 
       $scope.valueField="1";
       $scope.showAlertSuccess=false;
      $scope.showAlertFail=false;
      $scope.mapGG=$("#mapGoogle");
       $scope.toggle = function(modalstate, id,status) {
            $scope.modalstate = modalstate;

            switch (modalstate) {
                    case 'add':
                          $scope.form_title = "Add Match";

                          $scope.object={
                                matchId : "",
                                fieldId : 0,
                                fieldName : "",
                                hostId : "",
                                hostName : "",
                                status : "",
                                maxPlayers : "",
                                price : "",
                                startTime : "",
                                endTime : "",
                                isVerified : "",
                                verificationCode : "",
                          }
                                
                                $scope.showHostInput=false;
                                $scope.ngDisabledForm=false;
                                $scope.selectedDistrict="1";
                                $http.get(API_URL+"/districts").then(function(response) {
                                  $scope.districts = response.data;
                                });

                                $http.get(API_URL+ '/fields/district/' + parseInt($scope.selectedDistrict))
                                .success(function(response) {
                                      $scope.fields = response;
                                      $scope.latitude=response[0].latitude;
                                      $scope.longitude=response[0].longitude; 
                                      $scope.object.fieldId=response[0].fieldId;
                                });
                               
                          break;
                    case 'edit':
                          $scope.form_title = "Match Infomation";
                          if(status==1){
                                $scope.ngDisabledForm=true;
                          }else{
                                $scope.ngDisabledForm=false;
                          }
                          $scope.showHostInput=true;
                          $scope.id = id;
                          
                          $http.get(API_URL+"/districts").then(function(response) {
                            $scope.districts = response.data;
                          });
                          
                          $http.get(API_URL+"/fields").then(function(response) {
                            $scope.fields = response.data;
                          });

                          $http.get(API_URL+ '/matches/' + id)
                          .success(function(response) {
                                $scope.object = response;
                                 $http.get(API_URL+ '/fields/' + $scope.object.fieldId)
                                .success(function(response) {
                                      $scope.field = response;
                                      $scope.selectedDistrict=$scope.field.districtId.toString();
                                      $scope.latitude=$scope.field.latitude;
                                      $scope.longitude=$scope.field.longitude;
                                       alert($scope.latitude+" "+$scope.longitude);    
                                });
                                $scope.valueField=$scope.object.fieldId.toString();
                          });
                          
                          break;
                    default:
                          break;
            }
           
      }
      $scope.setFieldByDistrict=function(){
             $http.get(API_URL+ '/fields/district/' + parseInt($scope.selectedDistrict))
                                .success(function(response) {
                                      $scope.fields = response;
            });                    

      };
      $scope.setPositionField=function(){
                   $http.get(API_URL+ '/fields/' + $scope.object.fieldId)
                                .success(function(response) {
                                      $scope.field = response;
                                      $scope.latitude=$scope.field.latitude;
                                      $scope.longitude=$scope.field.longitude;                       
                                      alert($scope.latitude+" "+$scope.longitude); 

                    });        

      }
        
       //Lưu record mới / update record
       $scope.saveRecord = function(modalstate, id) {
            var url = API_URL + "/matches";
            var method="POST";
            if (modalstate === 'edit') {
                  method="PUT";
            }
             $http({
                   url: url,
                    method: method,
                    data: {
                          "fieldId": $scope.valueField,
                          "hostId": "1",
                          "maxPlayers": 15,
                          "price": 50,
                          "startTime": "26/11/2016 00:00:00",
                          "endTime": "27/11/2016 00:00:00",
                          "verificationCode": "Big",
                          "verified": true
                    },
                    headers: {"Content-Type": "application/json"}
             }).success(function(response) {
                    $scope.result(response);   
             }).error(function(response) {
                   alert('Đã xảy ra lỗi. Vui lòng kiểm tra log để biết chi tiết');
                    console.log(response);
             });

      }
   
      $scope.resetData=function(id){
          $http.get(API_URL+"/matches").then(function(response) {
              $scope.objects = response.data;
          });
      }
      $scope.comfirmDelete=function(id){
          $scope.idDelete=id;
      }
      $scope.deleteObject=function(id){
            $http.delete(API_URL + "/matches/"+id).then(function(response) {
                  $scope.result(response);   
                  
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