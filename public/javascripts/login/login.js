angular.module('LoginApp',[])
.controller('LoginCtrl', function($rootScope, $scope, $http) {
    $scope.init = function() {
        console.log("Login Initializing...");
        $rootScope.error = "";
        $rootScope.isLoading = false;
    }
    $scope.init();

    $scope.login = function() {
        $rootScope.isLoading = true;
        var data = {
            "username": $scope.username,
            "password": $scope.password,
        };
        $http.post('/authen/login', data).success(function(response){
            console.log(response);
            if (response.success){
                $rootScope.isLoading = false;
                document.cookie="token="+response.token+"; path=/";
                document.cookie="userid="+response.userid+"; path=/";
                document.cookie="username="+response.username+"; path=/";
                window.location.href = "/ui#/product"; //GO TO APP
            }
            else{
                $rootScope.isLoading = false;
                console.log(response.message);
                $rootScope.error = response.message;
            }
        });
    };
});
