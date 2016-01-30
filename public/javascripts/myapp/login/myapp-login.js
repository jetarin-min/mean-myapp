angular.module('appLogin', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: '/templates/login.html',
        controller: 'loginController'
    });
}])
.controller('loginController', function($scope, $location, $http) {
    $scope.init = function() {
        console.log("Login Initializing...");
        $scope.error = "";
    }
    $scope.init();

    $scope.login = function() {
        var data = {
            "username": $scope.username,
            "password": $scope.password,
        };
        $http.post('/authen/login', data).success(function(response){
            console.log(response);
            if (response.success){
                document.cookie="token="+response.token+"; path=/";
                document.cookie="userid="+response.userid+"; path=/";
                document.cookie="username="+response.username+"; path=/";
                $location.path("/product");
            }
            else{
                $scope.error = response.message;
            }
        });
    };

});

