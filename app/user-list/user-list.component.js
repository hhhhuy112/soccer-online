// Register `phoneList` component, along with its associated controller and template
angular.
  module('userList').
  component('userList', {
    templateUrl: 'user-list/user-list.template.html',
        
    controller: ['$http','$routeParams','$scope',
      function UserListController($http,$routeParams,$scope) {
      var self = this;
       var API_URL="http://soccernetworkapi-humiki.rhcloud.com"
      $http.get(API_URL+"/users").then(function(response) {
            $scope.objects = response.data;
      });
       $http.get(API_URL+"/districts").then(function(response) {
             $scope.districts = response.data;
      });
        $scope.isAdmin=true; 
       $scope.valueDistrict="1";
       $scope.showAlertSuccess=false;
      $scope.showAlertFail=false;
       $scope.toggle = function(modalstate, id) {
            $scope.modalstate = modalstate;

            switch (modalstate) {
                    case 'add':
                          $scope.form_title = "Add User";
                          $scope.object={
                                userId : "",
                                username: "Ex: minhhuyho",
                                password : "",
                                email:"Ex: minhhuyho@gmail.com",
                                phoneNumber: "",
                                status:"",
                                districtId:"",
                                districtName:"",
                                userType:0,
                                lastLogin:"",
                                verificationCode:"",
                                verified:""
                          }
                          break;
                    case 'edit':
                          $scope.form_title = "User Infomation";
                          $scope.id = id;
                          $http.get(API_URL+"/districts").then(function(response) {
                            $scope.districts = response.data;
                          });
                          $http.get(API_URL+ '/users/' + id)
                          .success(function(response) {
                                $scope.object = response;
                                $scope.valueDistrict=$scope.object.districtId.toString();
                                if($scope.object.userType==1){
                                      $scope.isAdmin=true;          
                                }else{
                                      $scope.isAdmin=false; 
                                } 
                          });
                          break;
                    default:
                          break;
            }
           
      }
      $scope.changeValueDistrict=function(){
            ;

      };
        $scope.setAdmin= function() {
            if($scope.isAdmin){
                $scope.object.userType="1";
            }else{
                $scope.object.userType="0";
            } 
      };
       //Lưu record mới / update record
       $scope.saveRecord = function(modalstate, id) {
            var url = API_URL + "/users";
            var method="POST";
            if (modalstate === 'edit') {
                  method="PUT";
            }
             $http({
                   url: url,
                    method: method,
                    data: {
                          "userId":$scope.object.userId,
                          "username":$scope.object.username,
                          "password":$scope.object.password,
                          "email":$scope.object.email,
                          "phoneNumber":$scope.object.phoneNumber,
                          "status":1,
                          "districtId":$scope.valueDistrict,
                          "userType":$scope.object.userType,
                          "lastLogin":"21/09/2016 20:00:00",
                          "verificationCode":"123652","verified":true
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
          $http.get(API_URL+"/users").then(function(response) {
              $scope.objects = response.data;
          });
      }
      $scope.comfirmDelete=function(id){
          $scope.idDelete=id;
      }
      $scope.deleteObject=function(id){
            $http.delete(API_URL + "/users/"+id).then(function(response) {
                  $scope.result(response);   
                  
            });
      };

      $scope.result=function(result){
              if(result["status"]==="success"){
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