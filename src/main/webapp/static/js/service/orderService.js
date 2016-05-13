'use strict';

var orderService = angular.module('orderService', ['ngResource']);
App.factory('Order', ['$resource', function ($resource) {
	//$resource() function returns an object of resource class
    return $resource('http://localhost:8080/order',{},
    		{
		        save: {
		            method: 'POST',
		            isArray: true
		          }
    		}
    );
}]);

