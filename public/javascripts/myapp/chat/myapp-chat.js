angular.module('appChat', ['ngRoute', 'ngCookies'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/chat', {
        resolve: {
            "check": function($cookies, $location){
                if(!$cookies.get("token")){
                    $location.path("/login");
                }
            }
        },
        controller: 'chatController',
        templateUrl: '/templates/chat.html',
    });
}])
.factory('socket', ['$rootScope', function($rootScope) {
    var socket = io.connect('http://127.0.0.1:9999');
        return {
            on: function(eventName, callback){
                socket.on(eventName, callback);
            },
            emit: function(eventName, data) {
                socket.emit(eventName, data);
            }
        };
}])
.controller('chatController', function($scope, socket, $cookies) {
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
