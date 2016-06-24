var mongoose = require('mongoose');

var paymentSchema = mongoose.Schema({
	amount : Number,
	paymentDate : Date,
	note : String,
	Category : {categoryId:String,name:String},
	SubCategory : {subcategoryId:String,name:String},
	paymentType : {paymentId:String,type:String}
});

module.exports = mongoose.model('Payment',paymentSchema);