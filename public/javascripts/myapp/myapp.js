angular.module('myApp',
    ['ngCookies',
    'ngRoute',
    'appLogin',
    'appUser',
    'appNote',
    'appProduct',
    'appChat',
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        resolve: {
            "check": function($cookies, $location) {
                if(!$cookies.get("user_id")) {
                    window.location.href = "/login";
                }
                else {
                    $location.path("/product");
                }
            }
       }
    })
    .when('/logout', {
        resolve: {
            "check": function($cookies, $location) {
                if($cookies.get("token")){
                    alert("You have been Logout");
                }
                $cookies.remove("username");
                $cookies.remove("userid");
                $cookies.remove("token");
                window.location.href="/login";
            }
        }
    });
}])
.controller('MenuCtrl', function($scope, $rootScope){
    $scope.toggle_menu = function(){
        $rootScope.isToggleMenu = !$rootScope.isToggleMenu;
    }
    $scope.toggle_chat = function(){
        $rootScope.isChat = !$rootScope.isChat;
    }
});
