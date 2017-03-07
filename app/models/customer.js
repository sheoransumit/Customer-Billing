// app/models/customer.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema       = mongoose.Schema;
// define our customer model
// module.exports allows us to pass this to other files when it is called
var CustomerSchema   = new Schema({
    Name : {type : String, required: true},
    Email : {type : String, required: true},
    Mobile : {type : String, required: true},
    Phone : {type : String, required: true},
    Addresses: [{
    	no: { type: String, lowercase: true, trim: true },
    	Flat: { type: String, lowercase: true, trim: true },
    	Street: { type: String, lowercase: true, trim: true },
    	State: { type: String, lowercase: true, trim: true },
    	PinCode: { type: String, lowercase: true, trim: true }
    	}],
    DOB : {type : Date, required: true}
});
module.exports = mongoose.model('Customer', CustomerSchema);