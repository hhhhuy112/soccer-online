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
      $scope.latlng = [16.055656,108.196791];
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
                                      $scope.fields = response.data;
                                      if($scope.fields.length>0){
                                          $scope.latitude=$scope.fields[0].latitude;
                                          $scope.longitude=$scope.fields[0].longitude; 
                                          $scope.object.fieldId=$scope.fields[0].fieldId;
                                      }
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
                                       $scope.latlng = [$scope.field.latitude,$scope.field.longitude];
                                });
                                $http.get(API_URL+ '/feedbacks/' + id)
                                .success(function(response) {
                                      $scope.feedbacks = response;
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
                                                      

                    });        

      }
      $scope.getpos = function(event){
            $scope.latlng = [event.latLng.lat(), event.latLng.lng()];
      };
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
                    $scope.result(response.data);   
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