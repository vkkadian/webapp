'use strict';

var orderService = angular.module('orderService', ['ngResource']);
App.factory('Order', ['$resource', function ($resource) {
	//$resource() function returns an object of resource class
    return $resource('/webapp/order',{},
    		{
		        save: {
		            method: 'POST',
		            isArray: true
		          }
    		}
    );
}]);

