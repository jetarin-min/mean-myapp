angular.module('appLogin', ['ngRoute','appRPC'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: '/templates/login.html',
        controller: 'loginController'
    });
}])
.controller('loginController', function($scope, $location, rpc) {
    $scope.init = function() {
        console.log("Login Initializing...");
        $scope.error = "";
    }
    $scope.init();

    $scope.login = function() {
        var data = {
            "login": $scope.username,
            "password": $scope.password,
            "db_name": "node_test",
        };
        var opt = {
            "context": {"data": data},
        };

        var args = [$scope.username, $scope.password, "node_test"];
        rpc.execute('login','login',args,opt)
        .then(function(data) {
            //console.log("Login Created");
            //console.log(data);
            var cookies = data.cookies;
            //$cookies.put('dbname', cookies.dbname);
            //$cookies.put('token', cookies.token);
            //$cookies.put('user_id', cookies.user_id);
            //$cookies.put('user_name', cookies.user_name);
            document.cookie="dbname="+cookies.dbname+"; path=/";
            document.cookie="token="+cookies.token+"; path=/";
            document.cookie="user_id="+cookies.user_id+"; path=/";
            document.cookie="user_name="+cookies.user_name+"; path=/";
            $location.path("/dashboard");
        }, function(error) {
            msg = error.error.message;
            $scope.error= msg;
            //console.log(error);
        });
    };

});

