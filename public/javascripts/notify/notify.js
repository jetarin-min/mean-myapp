angular.module('NotifyApp',['ui.bootstrap','ngAnimate'])
.factory('notify', function($uibModal) {
    return {
        error: function(message) {
            //TODO Disable action button while loading RPC
            console.log("error: "+message);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl : '/templates/modal.html',
                controller: 'ModalCtrl',
                size: 'sm',
                resolve: {
                    message: function (){
                        return message;
                    }
                }
            });
        }
    }

})
.controller('ModalCtrl', function($scope, $uibModalInstance, message) {
    $scope.message = message;
    $scope.close = function () {
        $uibModalInstance.dismiss('close');
    }
});

