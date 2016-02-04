angular.module('appUser', ['ngRoute', 'ngCookies'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/user', {
        resolve: {
            "check": function($cookies, $location){
                if(!$cookies.get("token")){
                    window.location.href = "/login";
                }
            }
        },
        controller: 'userController',
        templateUrl: '/templates/user.html',
    });
}])
.controller('userController', function($scope, $rootScope, $location, $http) {
    function load_users(){
        $rootScope.isLoading = true;
        $http.get('/api/user').success(function(response){
            if(response.success){
                $scope.users = response.data;
            }
            else {
                $scope.error = response.message;
            } 
            $rootScope.isLoading = false;
        });
    }
    $scope.init = function() {
        $rootScope.isToggleMenu = false;
        console.log("User Initializing...");
        $scope.error = "";
        $scope.flash = "";
        load_users();
    }
    $scope.init();

    $scope.create_user = function() {
        $rootScope.isLoading = true;
        $http.post('/api/user', $scope.user).success(function(response){
            console.log(response);
            if(response.success){
                $scope.flash = response.message;
                $scope.error = "";
                load_users();
                $scope.user.username = "";
                $scope.user.password = "";
            }
            else{
                $scope.error = response.message;
                $scope.flash = "";
            }
            $rootScope.isLoading = false;
        });
    };

});

