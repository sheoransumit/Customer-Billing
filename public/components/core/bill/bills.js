angular.module('myApp.bills', []).factory('Bills', ['$http', function($http) {

    return {
        // call to get all bills
        getBills : function() {
            return $http.get('/api/bills');
        },

        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new customer
        createBill : function(billData) {
            return $http.post('/api/bills', billData);
        },

        // call to DELETE a bill
        deleteBill : function(id) {
            return $http.delete('/api/bills/' + id);
        }
    }       

}]);