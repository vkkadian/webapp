'use strict';

App.controller('CatalogueController', ['$scope', 'Catalogue', function($scope, Catalogue) {
		  
          var self = this;
          self.Item = function () {
            
  	        this.item_id = '';
	        this.item_name = '';
	        this.unitPrice = 0;
	        this.baseSurchargeRate = 0;
	        this.additionalSurchargeRate = 0;
	        this.quantity = 0;	
        	this.baseSurchargeValue = 0;
        	this.additionalSurchargeValue = 0;
        	this.totalSurcharge = 0;
        	this.totalPrice = 0;
        	this.userType = '';

          }

          self.Item.prototype.computeBaseSurchargeValue = function(){
        	  this.baseSurchargeValue = (parseFloat(this.quantity)*parseFloat(this.unitPrice)*parseFloat(this.baseSurchargeRate)).toFixed(2);
          }
          
          self.Item.prototype.computeAdditionalSurchargeValue = function(){
        	  this.additionalSurchargeValue = (parseFloat(this.quantity)*parseFloat(this.unitPrice)*parseFloat(this.additionalSurchargeRate)).toFixed(2);
        	  console.log("additionalSurchargeRate::" + this.additionalSurchargeRate);
        	  console.log("unit price::" + this.unitPrice);
        	  console.log("quantity::" + this.quantity);
        	  console.log(this.additionalSurchargeValue);
          }
          
          self.Item.prototype.computeTotalPrice=function(){
	        	this.totalPrice = (parseFloat(this.quantity) * parseFloat(this.unitPrice) + 
	        			parseFloat(this.baseSurchargeValue) +
	        			parseFloat(this.additionalSurchargeValue)).toFixed(2);
	      }
          self.Item.prototype.computeTotalSurcharge=function(){
	        	this.totalSurcharge = (parseFloat(this.baseSurchargeValue) + 
	        			parseFloat(this.additionalSurchargeValue)).toFixed(2);
	      }          
          
          self.orderItem = new self.Item();
          
          self.addNewItem = function () {
        	  self.orderItems.push(self.orderItem);
        	  self.totalSurcharge= (parseFloat(self.totalSurcharge) + parseFloat(self.orderItem.totalSurcharge)).toFixed(2);
        	  self.totalPrice= (parseFloat(self.totalPrice) + parseFloat(self.orderItem.totalPrice)).toFixed(2);        	  
        	  self.reset();
          }
          
          self.reset = function () {
        	  self.orderItem = new self.Item();
        	  self.itemSelected='';
        	  self.userTypeSelected='';
        	  $scope.myForm.$setPristine(); //reset Form
          }
          
          self.submitOrder = function(){
        	  self.orderReceipt = Order.query();
          }
          
          self.items=[];
          self.totalSurcharge=0.00;
          self.totalPrice=0.00;
          self.orderItems=[];
          self.userTypes=[{'userType':'M'},{'userType':'NM'}];
          self.userTypeSelected='';
          self.itemSelected='';
          self.fetchCatalogue = function(){
        	  Catalogue.query().$promise.then(function(data) {
        		  self.catalogue = data;
        		  self.isArray = self.catalogue instanceof Array;
        	  });
          };
         
          self.setItems = function(){
        	  var selectedUserType = self.userTypeSelected;
        	  self.orderItem = new self.Item();
        	  if(!selectedUserType){
        		
        		  self.items =[];
        		  return;
        	  }
        	  self.orderItem.userType = selectedUserType.userType;
        	  if(selectedUserType.userType==='M'){
        		  self.items = self.catalogue[0].items;
        	  }else if(selectedUserType.userType==='NM'){
        		  self.items = self.catalogue[1].items;
        	  }
          }
          self.setOrderItem = function(){
        	  if(self.itemSelected.item_id){
	        	  self.orderItem.item_id = self.itemSelected.item_id;
	        	  self.orderItem.item_name = self.itemSelected.item_name;
	        	  self.orderItem.unitPrice = self.itemSelected.unitPrice;
	        	  self.orderItem.baseSurchargeRate = self.itemSelected.baseSurchargeRate;
	        	  self.orderItem.additionalSurchargeRate = self.itemSelected.additionalSurchargeRate;
        	  }
        	  
          }
          self.compute = function(){
        	  console.log(self.orderItem.quantity);
        	  if(self.orderItem.quantity && 
        			  self.orderItem.unitPrice){
        		  console.log("computing now...");
	        	  self.orderItem.computeBaseSurchargeValue();
	        	  self.orderItem.computeAdditionalSurchargeValue();
	        	  self.orderItem.computeTotalPrice();
	        	  self.orderItem.computeTotalSurcharge();

        	  }     		  
          }          
          
          self.fetchCatalogue();
         

      }]);
