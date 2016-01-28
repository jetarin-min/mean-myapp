angular.module('appUser', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/user', {
        templateUrl: '/templates/user.html',
        controller: 'userController'
    });
}])
.controller('userController', function($scope, $location, $http) {
    $scope.init = function() {
        console.log("User Initializing...");
        $scope.error = "";
        $scope.flash = "";
    }
    $scope.init();

    $scope.create_user = function() {
        $http.post('/api/user', $scope.user).success(function(response){
            console.log(response);
            if(response.success){
                $scope.flash = response.message;
                $scope.error = "";
            }
            else{
                $scope.error = response.message;
                $scope.flash = "";
            }
        });
    };

});

