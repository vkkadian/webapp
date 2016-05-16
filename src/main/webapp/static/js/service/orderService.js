'use strict';

var orderService = angular.module('orderService', ['ngResource']);
App.factory('Order', ['$resource', function ($resource) {
	//$resource() function returns an object of resource class
    return $resource(
    	//'/webapp/static/data/order_output.json',{},
    	'http://order-excercise.rhcloud.com/order',{},
    		{
		        save: {
		            method: 'POST',
		            headers:{'Content-Type':'application/json;charset=UTF-8'}
		          }
    		}
    );
}]);

