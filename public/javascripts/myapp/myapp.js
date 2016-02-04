angular.module('myApp',
    ['ngCookies',
    'ngRoute',
    'appUser',
    'appNote',
    'appProduct',
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
.factory('socket', ['$rootScope', function($rootScope) {
    var socket = io.connect('http://188.166.249.56:3009');
        return {
            on: function(eventName, callback){
                socket.on(eventName, callback);
            },
            emit: function(eventName, data) {
                socket.emit(eventName, data);
            }
        };
}])
.controller('MenuCtrl', function($scope, $rootScope){
    $scope.toggle_menu = function(){
        $rootScope.isToggleMenu = !$rootScope.isToggleMenu;
    }
    $scope.toggle_chat = function(){
        $rootScope.isChat = !$rootScope.isChat;
    }
})
.controller('ChatCtrl', function($scope, $rootScope, socket, $cookies){
    $scope.close_chat = function(){
        console.log("Close Chat");
        $rootScope.isChat = false;
    }
    $scope.send_text = function() {
        socket.emit('send-text', $cookies.get("username")+": "+$scope.chat.text);
        $scope.chat.text = "";
    };
    socket.on('broadcast-text', function(data) {
        console.log("Incomming message: "+data);
        old_msg = document.getElementById("msg_box").innerHTML;
        document.getElementById("msg_box").innerHTML = old_msg + "<p>"+data.message+"</p>";
    });
})
console.log("CHAT");
