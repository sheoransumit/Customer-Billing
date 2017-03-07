'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $window, Customers) {
  $scope.customer = {Name:"", Email:"", Mobile:"", Phone:"", Addresses:[{no: 'addr1', Flat:'', Street:'', State:'', PinCode:''} , {no: 'addr2'}], DOB:""};
 
  $scope.addNewChoice = function() {
    var newItemNo = $scope.customer.Addresses.length + 1;
    $scope.customer.Addresses.push({'no':'addr'+newItemNo});
  };
    
  $scope.removeChoice = function() {
    var lastItem = $scope.customer.Addresses.length - 1;
    $scope.customer.Addresses.splice(lastItem);
  };	



  Customers.getCustomers().then(function(response){
    $scope.customers = response.data;
    console.log($scope.customers);
  });



  $scope.addNewCustomer = function() {
    if ($scope.customer.Name != "" && $scope.customer.Email != "" && $scope.customer.Mobile != "" && $scope.customer.Phone != "" && $scope.customer.Addresses != "" && $scope.customer.DOB != "") {
      if (typeof $scope.customer._id === "undefined")
        Customers.createCustomer($scope.customer);
      else{
        console.log($scope.customer._id);
        Customers.editCustomer($scope.customer._id, $scope.customer).then(function(response){
            $scope.Customers = response.data;
          });
      }
      $scope.customer = "";
      Customers.getCustomers().then(function(response){
        $scope.customers = response.data;
      });
    }
    else {
      $window.alert("All fields are mandatory");
    }
  }
  
  $scope.clearCustomer = function () {
    $scope.customer = {Name:"", Email:"", Mobile:"", Phone:"", Addresses:[{no: 'addr1', Flat:'', Street:'', State:'', PinCode:''}], DOB:""};
  }

  $scope.editCustomer = function (x, y) {
    $scope.customer = y;
    $scope.customer.DOB = new Date(y.DOB);
  }

  $scope.removeCustomer = function (x) {
    console.log(x);
    Customers.deleteCustomer(x);
    Customers.getCustomers().then(function(response){
      $scope.Customers = response.data;
    });
  }

  // $scope.filtered = function (){
  //   $scope.domTasks = [];
  //   if($scope.filterState == ""){
  //     $scope.domTasks = $scope.tasks;
  //   }
  //   else {
  //     for (var i = 0; i < $scope.tasks.length; i++) { 
  //       if($scope.tasks[i].selectedState == $scope.filterState){
  //         $scope.domTasks.push($scope.tasks[i]);
  //       }
  //     }
  //   }
  // }
  // $scope.reset = function (){
  //   $scope.domTasks = $scope.tasks;
  //   $scope.filterState = "";
  // } 

});