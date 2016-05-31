var _ = require('lodash');
var PaymentType = require('../model/paymentType.js');

module.exports = function(app){
	/* Create */
	app.post('/paymenttype',function(req,res){
		var paymentType = new PaymentType(req.body);
		paymentType.save(function(err){
			if(err){
				res.json({info : 'Error in saving new Payment type'});
			}
			res.json({info : 'New Payment type saved successfully'});
		})
	});

	/* Read */
	app.get('/paymenttype',function(req,res){
		PaymentType.find(function(err,paymenttypes){
			if(err){
				res.json({info:'Error finding Payment types',error:err});
			}
			res.json({info:'Payment types found successfully',data : paymenttypes});
		});
	});

	/* Read by Id */
	app.get('/paymenttype/:id',function(req,res){
		PaymentType.findById(req.params.id,function(err,paymenttype){
			if(err){
				res.json({info:'Error in finding Payment type',error:err});
			}
			res.json({info:'Payment type found successfully',data:paymenttype});
		});
	});

	/* Update */
	app.put('/paymenttype/:id',function(req,res){
		PaymentType.findById(req.params.id,function(err,paymenttype){
			if(err){
				res.json({info:'Error finding the Payment type'});
			}
			if(paymenttype){
				_.merge(paymenttype,req.body);
				PaymentType.save(function(err){
					if(err){
				res.json({info : 'Error in saving new Payment type'});
				}
				res.json({info : 'Payment type saved successfully'});
				});
			}
		});
	});

	/* Delete */
	app.delete('/paymenttype/:id',function(req,res){
		PaymentType.findByIdAndRemove(req.params.id,function(err){
			if(err){
				res.json({info:'Failed to delete Payment type'});
			}
			res.json({info:'Payment type deleted successfully'});
		});
	});
};