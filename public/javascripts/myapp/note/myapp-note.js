angular.module('appNote', ['ngRoute', 'ngCookies'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/note', {
        resolve: {
            "check": function($cookies, $location){
                if(!$cookies.get("token")){
                    window.location.href = "/login";
                }
            }
        },
        controller: 'noteController',
        templateUrl: '/templates/note.html',
    });
}])
.controller('noteController', function($scope, $rootScope, $location, $http, $cookies) {
    function load_notes(){
        $rootScope.isLoading = true;
        var userid = $cookies.get('userid');
        $http.get('/api/note/'+userid).success(function(response){
            if(response.success){
                $scope.notes = response.data;
            }
            else {
                $scope.error = response.message;
            } 
            $rootScope.isLoading = false;
        });
    }
    $scope.init = function() {
        $rootScope.isToggleMenu = false;
        console.log("Note Initializing...");
        $scope.note = { //TODO
            text: "",
            uid: "",
        }
        $scope.error = "";
        $scope.flash = "";
        load_notes();
    }
    $scope.init();


    $scope.create_note = function() {
        $rootScope.isLoading = true;
        $scope.note.uid = $cookies.get('userid');
        $http.post('/api/note', $scope.note).success(function(response){
            console.log(response);
            if(response.success){
                $scope.flash = response.message;
                $scope.error = "";
                load_notes();
                $scope.note.text = "";
                $scope.note.uid = "";
            }
            else{
                $scope.error = response.message;
                $scope.flash = "";
            }
            $rootScope.isLoading = false;
        });
    };

});

