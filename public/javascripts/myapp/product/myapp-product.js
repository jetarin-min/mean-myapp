angular.module('appProduct', ['ngRoute', 'ngCookies','ngAnimate','ui.bootstrap'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/product', {
        resolve: {
            "check": function($cookies, $location){
                if(!$cookies.get("token")){
                    window.location.href = "/login";
                }
            }
        },
        controller: 'productController',
        templateUrl: '/templates/product.html',
    });
}])
.controller('productController', function($scope, $location, $http, $cookies, $uibModal,$rootScope) {
    function load_products(){
        $rootScope.isLoading = true;
        $http.get('/api/product').success(function(response){
            if(response.success){
                $scope.products = response.data;
            }
            else {
                $scope.error = response.message;
            } 
            $rootScope.isLoading = false;
        });
    }
    $scope.init = function() {
        $rootScope.isToggleMenu = false;
        console.log("Produt Initializing...");
        $scope.error = "";
        $scope.flash = "";
        load_products();
    }
    $scope.init();


    $scope.create_product = function() {
        $rootScope.isLoading = true;
        $http.post('/api/product', $scope.product).success(function(response){
            console.log(response);
            if(response.success){
                $scope.flash = response.message;
                $scope.error = "";
                load_products();
                $scope.product.name = "";
                $scope.product.code = "";
                $scope.product.price = "";
            }
            else{
                $scope.error = response.message;
                $scope.flash = "";
            }
            $rootScope.isLoading = false;
        });
    };

    $scope.delete_product = function(id) {
        $rootScope.isLoading = true;
        $http.delete('/api/product/'+id).success(function(response){
            console.log(response);
            if(response.success){
                $scope.flash = response.message;
                $scope.error = "";
                load_products();
            }
            else{
                $scope.error = response.message;
                $scope.flash = "";
            }
            $rootScope.isLoading = false;
        });
    };
    $scope.open_edit_modal = function (id) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/templates/edit-product.html',
            controller: 'editProductController',
            size: 'md',
            resolve: {
                id: function () {
                    return id;
                }
            }
        });
        modalInstance.result.then(function () {
            console.log("Edit Successful");
            $scope.flash = "Edit Successful";
            load_products();
        },
        function () {
            console.log("Modal Closed");
        });
   }
})
.controller("editProductController", function ($scope, $http, $uibModalInstance, id, $rootScope) {
    function load_product(get_id){
        $rootScope.isLoading = true;
        $http.get('/api/product/'+get_id).success(function(response){
            if(response.success){
                console.log(response.data);
                $scope.product = response.data;
            }
            else {
                $scope.error = response.message;
            } 
            $rootScope.isLoading = false;
        });
    }
    $scope.init = function(){
        console.log("Edit Product Initializing...");
        load_product(id);
        $scope.error = "";
    }
    $scope.init();
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
    $scope.edit_product = function() {
        $rootScope.isLoading = true;
        var body = {
            "name": $scope.product.name,
            "code": $scope.product.code,
            "price": $scope.product.price,
        }
        $http.put('/api/product/'+id, body).success(function(response){
            if(response.success){
                console.log(response.message);
                $scope.error = null;
                $uibModalInstance.close(response.message);
            }
            else {
                $scope.error = response.message;
            } 
            $rootScope.isLoading = false;
        });
    }
});

