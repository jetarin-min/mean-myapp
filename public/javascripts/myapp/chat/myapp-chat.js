angular.module('appChat', ['ngRoute', 'ngCookies'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/chat', {
        resolve: {
            "check": function($cookies, $location){
                if(!$cookies.get("token")){
                    window.location.href = "/login";
                }
            }
        },
        controller: 'chatController',
        templateUrl: '/templates/chat.html',
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
.controller('chatController', function($scope, $rootScope, socket, $cookies) {
    $rootScope.isToggleMenu = false;
    $scope.chats = [];
    $scope.send_text = function() {
        socket.emit('send-text', $cookies.get("username")+": "+$scope.chat.text);
        $scope.chat.text = "";
    };
    socket.on('broadcast-text', function(data) {
        console.log("Incomming message: "+data);
        old_msg = document.getElementById("msg_box").innerHTML;
        document.getElementById("msg_box").innerHTML = old_msg + "<p>"+data.message+"</p>";
    });
});

