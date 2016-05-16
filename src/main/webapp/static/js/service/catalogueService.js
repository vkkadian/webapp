'use strict';

var catalogueService = angular.module('catalogueService', ['ngResource']);
App.factory('Catalogue', ['$resource', function ($resource) {
	//$resource() function returns an object of resource class
    return $resource(
    		//'/webapp/static/data/data.json', {},
    		'http://catalogue-excercise.rhcloud.com/items',{},
    		{
    		    query: {
    		        method: 'GET',
    		        isArray: true
    		      }    			
    		}    		
    );
}]);

