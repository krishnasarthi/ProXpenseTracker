var mongoose = require('mongoose');

var subcategorySchema = mongoose.Schema({
	name : String,
	category : {
		categoryId:String,
		name:String
	}	
});

module.exports = mongoose.model('Subcategory',subcategorySchema);