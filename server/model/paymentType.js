var mongoose = require('mongoose');

var paymentTypeSchema = mongoose.Schema({
	type : String
});

module.exports = mongoose.model('PaymentType',paymentTypeSchema);