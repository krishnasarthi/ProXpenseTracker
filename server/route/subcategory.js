var _ = require('lodash');
var Subcategory = require('../model/subcategory.js');

module.exports = function(app){
	/* Create */
	app.post('/subcategory',function(req,res){
		var newSubcategory = new Subcategory(req.body);
		newSubcategory.save(function(err){
			if(err){
				res.json({info : 'Error in saving new Subcategory'});
			}
			res.json({info : 'New Subcategory saved successfully'});
		})
	});

	/* Read */
	app.get('/subcategory',function(req,res){
		Subcategory.find(function(err,subcategories){
			if(err){
				res.json({info:'Error finding Subcategories',error:err});
			}
			res.json({info:'Subcategories found successfully',data : subcategories});
		});
	});

	/* Read by Id */
	app.get('/subcategory/:id',function(req,res){
		Subcategory.findById(req.params.id,function(err,subcategory){
			if(err){
				res.json({info:'Error in finding Category',error:err});
			}
			res.json({info:'Category found successfully',data:subcategory});
		});
	});

	/* Update */
	app.put('/subcategory/:id',function(req,res){
		Subcategory.findById(req.params.id,function(err,subcategory){
			if(err){
				res.json({info:'Error finding the subcategory'});
			}
			if(subcategory){
				_.merge(subcategory,req.body);
				subcategory.save(function(err){
					if(err){
				res.json({info : 'Error in saving new subcategory'});
				}
				res.json({info : 'subcategory saved successfully'});
				});
			}
		});
	});

	/* Delete */
	app.delete('/subcategory/:id',function(req,res){
		Subcategory.findByIdAndRemove(req.params.id,function(err){
			if(err){
				res.json({info:'Failed to delete subcategory'});
			}
			res.json({info:'subcategory deleted successfully'});
		});
	});
};