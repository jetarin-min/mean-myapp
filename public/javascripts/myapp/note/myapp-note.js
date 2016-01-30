angular.module('appNote', ['ngRoute', 'ngCookies'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/note', {
        resolve: {
            "check": function($cookies, $location){
                if(!$cookies.get("token")){
                    $location.path("/login");
                }
            }
        },
        controller: 'noteController',
        templateUrl: '/templates/note.html',
    });
}])
.controller('noteController', function($scope, $location, $http, $cookies) {
    function load_notes(){
        var userid = $cookies.get('userid');
        $http.get('/api/note/'+userid).success(function(response){
            if(response.success){
                $scope.notes = response.data;
            }
            else {
                $scope.error = response.message;
            } 
        });
    }
    $scope.init = function() {
        console.log("Note Initializing...");
        $scope.error = "";
        $scope.flash = "";
        load_notes();
    }
    $scope.init();


    $scope.create_note = function() {
        $scope.note.uid = $cookies.get('userid');
        $http.post('/api/note', $scope.note).success(function(response){
            console.log(response);
            if(response.success){
                $scope.flash = response.message;
                $scope.error = "";
                load_notes();
            }
            else{
                $scope.error = response.message;
                $scope.flash = "";
            }
        });
    };

});

