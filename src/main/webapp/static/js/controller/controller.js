'use strict';

App.controller('Controller', ['$scope', 'Catalogue', 'Order', function($scope, Catalogue,Order) {
		  
          var self = this;
          self.Item = function () {
            
  	        this.item_id = '';
  	        this.item_name = '';
  	        this.unitPrice = 0.00;
  	        this.baseSurchargeRate = 0.00;
  	        this.additionalSurchargeRate = 0.00;
  	        this.quantity = 1;	
          	this.baseSurchargeValue = 0.00;
          	this.additionalSurchargeValue = 0.00;
          	this.totalSurcharge = 0.00;
          	this.totalPrice = 0.00;
          	this.userType = '';
            this.userTypeDescription = '';

          }
          self.dataLoading='';
          self.decimals = 2;
          self.userTypes='';          
          self.items=[];
          self.orderItems=[];
          self.orderReceipt = '';
          self.orderItem = new self.Item();
          self.userTypeSelected='';
          self.itemSelected='';
          self.totalSurcharge=0.00;
          self.totalPrice=0.00;          


          self.Item.prototype.computeBaseSurchargeValue = function(){
        	  this.baseSurchargeValue = self.round(this.quantity*this.unitPrice*this.baseSurchargeRate);
          }
          
          self.Item.prototype.computeAdditionalSurchargeValue = function(){
        	  this.additionalSurchargeValue = self.round(this.quantity*this.unitPrice*this.additionalSurchargeRate);
          }
          
          self.Item.prototype.computeTotalPrice=function(){
	        	this.totalPrice = self.round(this.quantity*this.unitPrice + this.baseSurchargeValue +	this.additionalSurchargeValue);
	      }
          self.Item.prototype.computeTotalSurcharge=function(){
	        	this.totalSurcharge = self.round(this.baseSurchargeValue + this.additionalSurchargeValue);
	      }          
          
          self.addNewItem = function () {
            self.orderReceipt='';
        	  self.orderItems.push(self.orderItem);
        	  self.totalSurcharge= self.round(self.totalSurcharge + self.orderItem.totalSurcharge);
        	  self.totalPrice= self.round(self.totalPrice + self.orderItem.totalPrice);        	  
        	  self.reset();
          }

          self.resetForm =  function () {
            $scope.myForm.$setPristine(); //reset Form
          }


          self.resetModelValues =  function () {

            self.orderItem = new self.Item();
            self.userTypeSelected='';
            self.itemSelected='';
            self.items = [];            
          }          
          
          self.resetComplete = function (resetReceipt) {
            self.resetForm();
            self.resetModelValues();
            self.orderItems = [];
            self.orderReceipt = (!resetReceipt)?self.orderReceipt: '';            
            self.totalSurcharge = 0.00;
            self.totalPrice=0.00;            
          }
          
          self.reset = function () {
        	  self.resetForm();
            self.resetModelValues();
          }
          
          self.submitOrder = function(){
            self.dataLoading = 'loading';
            Order.save(self.prepareOrder()).$promise.then(function(data) {
              self.orderReceipt = data;
              self.dataLoading = '';
            });            
            
            self.resetComplete();
          }
          
          self.prepareOrder = function (){
            var order =[];
            for (var i =0;i < self.orderItems.length; i++) {
              var orderItem = {};
              orderItem.item_id = self.orderItems[i].item_id;
              orderItem.userType = self.orderItems[i].userType;
              orderItem.quantity = self.orderItems[i].quantity;
              orderItem.item_name = self.orderItems[i].item_name;
              orderItem.unitPrice = self.orderItems[i].unitPrice;
              orderItem.totalPrice = self.orderItems[i].totalPrice;
              orderItem.totalSurcharge = self.orderItems[i].totalSurcharge;

              order.push(orderItem);
            };
            return order;
          }

          self.fetchCatalogue = function(){
        	  Catalogue.query().$promise.then(function(data) {
              self.dataLoading = false;
        		  self.catalogue = data;
        		  self.isArray = self.catalogue instanceof Array;
              self.userTypes=[{'userType':'M','userTypeDescription':'Management'},{'userType':'NM','userTypeDescription':'Non-Management'}];
        	  });
          };
         
          self.setItems = function(){
        	  var selectedUserType = self.userTypeSelected;
            self.resetModelValues();
            self.userTypeSelected = (selectedUserType)?selectedUserType:'';
        	  self.orderItem.userType = (selectedUserType)?selectedUserType.userType:'';
        	  self.orderItem.userTypeDescription = (selectedUserType)?selectedUserType.userTypeDescription:'';
        	  if(selectedUserType && selectedUserType.userType==='M'){
        		  self.items = (self.catalogue)?self.catalogue[0].items:[];
        	  }else if(selectedUserType && selectedUserType.userType==='NM'){
        		  self.items = (self.catalogue)?self.catalogue[1].items:[];
        	  }
          }
          self.setOrderItem = function(){
        	  if(self.itemSelected && self.itemSelected.item_id){
	        	  self.orderItem.item_id = self.itemSelected.item_id;
	        	  self.orderItem.item_name = self.itemSelected.item_name;
	        	  self.orderItem.unitPrice = self.itemSelected.unitPrice;
	        	  self.orderItem.baseSurchargeRate = self.itemSelected.baseSurchargeRate;
	        	  self.orderItem.additionalSurchargeRate = self.itemSelected.additionalSurchargeRate;
        	  }else{
              self.orderItem = new self.Item();
              self.orderItem.userType = self.userTypeSelected.userType;
              self.orderItem.userTypeDescription = self.userTypeSelected.userTypeDescription;
            }
        	  self.compute();
          }
          self.compute = function(){
        	  if(self.orderItem.quantity && 
       			  self.orderItem.unitPrice){
	        	  self.orderItem.computeBaseSurchargeValue();
	        	  self.orderItem.computeAdditionalSurchargeValue();
	        	  self.orderItem.computeTotalPrice();
	        	  self.orderItem.computeTotalSurcharge();

        	  }     		  
          }          
          
          self.round = function(value) {

              return Number(Math.round(value+'e'+self.decimals)+'e-'+self.decimals);
          }

          self.fetchCatalogue();
         

      }]);
