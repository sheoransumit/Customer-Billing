angular.module('myApp.customers', []).factory('Customers', ['$http', function($http) {

    return {
        // call to get all customers
        getCustomers : function() {
            return $http.get('/api/customers');
        },

        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new customer
        createCustomer : function(customerData) {
            return $http.post('/api/customers', customerData);
        },

        // call to DELETE a customer
        deleteCustomer : function(id) {
            return $http.delete('/api/customers/' + id);
        },

        editCustomer : function(id , customerModification) {
            console.log("i am here");
            console.log(customerModification);
            var url = '/api/customers/' + id;
            return $http.put(url , customerModification);
        }
    }       

}]);