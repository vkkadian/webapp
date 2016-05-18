'use strict';

var orderService = angular.module('orderService', ['ngResource']);
App.factory('Order', ['$resource', function ($resource) {
	//$resource() function returns an object of resource class
    return $resource(
    	//'/webapp/static/data/order_output.json',{},
    	'http://order-excercise.rhcloud.com/order',{},
    	//'http://localhost:8090/order',{},
    		{
		        save: {
		            method: 'POST'
		          }
    		}
    );
}]);

