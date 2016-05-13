'use strict';

var catalogueService = angular.module('catalogueService', ['ngResource']);
App.factory('Catalogue', ['$resource', function ($resource) {
	//$resource() function returns an object of resource class
    return $resource(
    		'http://localhost:8080/webapp/static/data/data.json', {},
    		{
    		    query: {
    		        method: 'GET',
    		        transformResponse: function(data) {
    		          return angular.fromJson(data);
    		        },
    		        isArray: true
    		      }    			
    		}    		
    );
}]);

