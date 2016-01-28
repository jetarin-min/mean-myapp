angular.module('myApp',
    ['ngCookies',
    'ngRoute',
    'appLogin',
    'appUser',
//    'app.Dashboard',
])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        resolve: {
            "check": function($cookies, $location) {
                if(!$cookies.get("user_id")) {
                    $location.path("/login");
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
                //$cookies.remove("user_name");
                //$cookies.remove("user_id");
                $cookies.remove("token");
                $location.path("/login");
            }
        }
    });
}])
