var _ = require('lodash');
var Category = require('../model/category.js');

module.exports = function(app){
	/* Create */
	app.post('/category',function(req,res){
		var newCategory = new Category(req.body);
		newCategory.save(function(err){
			if(err){
				res.json({info : 'Error in saving new category'});
			}
			res.json({info : 'New Category saved successfully'});
		})
	});

	/* Read */
	app.get('/category',function(req,res){
		Category.find(function(err,categories){
			if(err){
				res.json({info:'Error finding Categories',error:err});
			}
			res.json({info:'Categories found successfully',data : categories});
		});
	});

	/* Read by Id */
	app.get('/category/:id',function(req,res){
		Category.findById(req.params.id,function(err,category){
			if(err){
				res.json({info:'Error in finding Category',error:err});
			}
			res.json({info:'Category found successfully',data:category});
		});
	});

	/* Update */
	app.put('/category/:id',function(req,res){
		Category.findById(req.params.id,function(err,category){
			if(err){
				res.json({info:'Error finding the category'});
			}
			if(category){
				_.merge(category,req.body);
				category.save(function(err){
					if(err){
				res.json({info : 'Error in saving new category'});
				}
				res.json({info : 'Category saved successfully'});
				});
			}
		});
	});

	/* Delete */
	app.delete('/category/:id',function(req,res){
		Category.findByIdAndRemove(req.params.id,function(err){
			if(err){
				res.json({info:'Failed to delete Category'});
			}
			res.json({info:'Category deleted successfully'});
		});
	});	
};