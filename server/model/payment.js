var mongoose = require('mongoose');

var paymentSchema = mongoose.Schema({
	amount : Number,
	paymentDate : Date,
	description : String,
	category : {categoryId:String,name:String},
	subCategory : {subcategoryId:String,name:String},
	paymentType : {paymentId:String,name:String}
});

module.exports = mongoose.model('Payment',paymentSchema);