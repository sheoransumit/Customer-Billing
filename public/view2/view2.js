'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', function($scope, $window, Customers, Bills) {
  $scope.bill = { Items:[{no: 'itm1', name:'', quantity:'', rate:''}],Discount:"", Tax:"", CustomerId:""};
  $scope.customer = {Name:"", Email:"", Mobile:"", Phone:"", Addresses:[{no: 'addr1', Flat:'', Street:'', State:'', PinCode:''} , {no: 'addr2'}], DOB:""};
 
  Bills.getBills().then(function(response){
    $scope.myData = response.data;
    console.log($scope.myData);
  });

  Customers.getCustomers().then(function(response){
    console.log("Hi");
    $scope.customers = response.data;
    console.log($scope.customers);
  });

  $scope.addNewChoice = function() {
    var newItemNo = $scope.bill.Items.length + 1;
    $scope.bill.Items.push({'no':'itm'+newItemNo});
  };
    
  $scope.removeChoice = function() {
    var lastItem = $scope.bill.Items.length - 1;
    $scope.bill.Items.splice(lastItem);
  };

	$scope.addNewBill = function() {
      if ($scope.bill.Items.quantity != "" && $scope.bill.Items.rate != "" && $scope.bill.Discount != "" && $scope.bill.Tax != "" && $scope.bill.Items.name != "" && $scope.bill.CustomerId != "") {
        Bills.createBill($scope.bill);
        $scope.bill = { Items:[{no: 'itm1', name:'', quantity:'', rate:''}],Discoount:"", Tax:"", CustomerId:""};
      }
      else {
        $window.alert("All fields are mandatory");
      }
	};
});