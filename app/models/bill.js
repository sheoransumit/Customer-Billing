// app/models/customer.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema       = mongoose.Schema;
// var autoIncrement = require('mongoose-auto-increment');
// define our customer model

var BillSchema   = new Schema({
    // BillNumber : {type : String},
    // BillDate : {type : Date, default: Date.now},
    BillDate : {type : Date, default: Date.now},
    Items: [{
    	no: { type: String, lowercase: true, trim: true },
    	name: { type: String, lowercase: true, trim: true },
    	quantity: { type: Number, required:true},
    	rate: { type: String, required:true }
    	}],
    Discount : {type : Number, required: true},
    Tax : {type : Number, required: true},
    CustomerId : {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}
});
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Bill', BillSchema);