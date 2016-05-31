var mongoose = require('mongoose');

var subcategorySchema = mongoose.Schema({
	name : String,
	categoryId : String	
});

module.exports = mongoose.model('Subcategory',subcategorySchema);