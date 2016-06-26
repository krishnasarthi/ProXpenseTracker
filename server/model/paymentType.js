var mongoose = require('mongoose');

var paymentTypeSchema = mongoose.Schema({
	name : String,
	description : String,
	insertdate : Date
});

module.exports = mongoose.model('PaymentType',paymentTypeSchema);