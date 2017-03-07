// app/routes.js

// grab the models we just created
var Customer = require('./models/customer');
var Bill = require('./models/bill');
var express        = require('express');
var router = express.Router();              // get an instance of the express Router
    
    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // middleware to use for all requests
        router.use(function(req, res, next) {
            // do logging
            console.log('Something is happening.');
            next(); // make sure we go to the next routes and don't stop here
        });

        // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
        router.get('/', function(req, res) {
            res.json({ message: 'hooray! welcome to our api!' });   
        });

        router.route('/customers')

        // create a customer (accessed at POST http://localhost:8080/api/customers)
        .post(function(req, res) {
            console.log("here");
            var customer = new Customer();
            var data = req.body;
            console.log(data);
            // customer = data;
            customer.Name = data.Name;  
            customer.Mobile = data.Mobile;
            customer.Phone = data.Phone;
            customer.Addresses = data.Addresses;
            customer.DOB = data.DOB;
            customer.Email = data.Email;
            console.log(customer);
            customer.save(function(err) {
                if (err)
                    return res.send(err);

                res.json({ message: 'customer created!' });
            });            
        })

        // get all the customers (accessed at GET http://localhost:8080/api/customers)
        .get(function(req, res) {
            // use mongoose to get all customers in the database
            Customer.find(function(err, customers) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    return res.send(err);

                res.json(customers); // return all customers in JSON format
            });
        });

        router.route('/customers/:customer_id')

        .put(function(req, res) {

            // use our customer model to find the customer we want
            Customer.findById(req.params.customer_id, function(err, customer) {
                console.log(customer);
                if (err)
                    res.send(err);
                else{
                    var data = req.body;
                    // customer = data;
                    console.log(customer);
                    customer.Name = data.Name;  
                    customer.Mobile = data.Mobile;
                    customer.Phone = data.Phone;
                    customer.Addresses = data.Addresses;
                    customer.DOB = data.DOB;
                    customer.Email = data.Email;
                }

                // save the customer
                customer.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Customer updated!' });
                });
            });
        })

        .delete(function(req, res) {
            Customer.remove({
                _id: req.params.customer_id
            }, function(err, customer){
                if(err)
                    res.send(err);

                res.json({ message: 'Successfully deleted'});
            });
        });

        router.route('/bills')

        // create a customer (accessed at POST http://localhost:8080/api/customers)
        .post(function(req, res) {
            var bill = new Bill();
            var data = req.body;
            bill.Items = data.Items;  
            bill.Discount = data.Discount;
            bill.Tax = data.Tax;
            bill.CustomerId = data.CustomerId;
            bill.save(function(err) {
                if (err)
                    return res.send(err);
            
                console.log(bill);
                    
                res.json({ message: 'bill created!' });
            });            
        })

        // get all the customers (accessed at GET http://localhost:8080/api/customers)
        .get(function(req, res) {
            // use mongoose to get all customers in the database
            Bill.find(function(err, bills) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    return res.send(err);

                res.json(bills); // return all customers in JSON format
            });
        });
        // route to handle delete goes here (app.delete)
        // REGISTER OUR ROUTES -------------------------------
        // all of our routes will be prefixed with /api
        app.use('/api', router);

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };