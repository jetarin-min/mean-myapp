angular.module('appRPC',[])
.factory('rpc', ['$http','$q', function($http,$q,$window) {
    return {
        execute: function(model,method,args,opts,cb) {
            //TODO Disable action button while loading RPC
            console.log("RPC",model,method,args,opts);
            var params = [model,method];
            params.push(args);
            if (opts) {
                params.push(opts);
            }
            return $http.post('/json_rpc', {
                    id: (new Date()).getTime(),
                    method: "execute",
                    params: params,
                }).
                then(function(response) {
                    if (response.data){
                        if (response.data.error){ //Server Fail
                            //TODO support multiple type of return data (cookies, result, location)
                            console.log("RPC Execute Fail!!");
                            console.log(response.data.error);
                            return $q.reject(response.data);
                        }
                        else{
                            console.log("RPC OK", model, method);
                            return response.data.result;
                        }
                    }
                }, function(response) { //Request Fail
                    console.log("RPC Execute Fail!!");
                    return $q.reject(response.data);
                });
        },
    };
}])
