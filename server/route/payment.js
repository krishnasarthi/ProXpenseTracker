var _ = require('lodash');
var Payment = require('../model/payment.js');

module.exports = function(app){
	/* Create */
	app.post('/payment',function(req,res){
		var payment = new Payment(req.body);
		payment.save(function(err){
			if(err){
				res.json({info : 'Error in saving new Payment'});
			}
			res.json({info : 'New Payment saved successfully'});
		})
	});

	/* Read */
	app.get('/payment',function(req,res){
		var query = Payment.find().sort({paymentDate:-1});
		query.exec(function(err,payments){
			if(err){
				res.json({info:'Error finding Payment',error:err});
			}
			res.json({info:'Payment found successfully',data : payments});
		});
	});

	/* Read by Id */
	app.get('/payment/:id',function(req,res){
		Payment.findById(req.params.id,function(err,payment){
			if(err){
				res.json({info:'Error in finding Payment',error:err});
			}
			res.json({info:'Payment found successfully',data:payment});
		});
	});

	/* Update */
	app.put('/payment/:id',function(req,res){
		Payment.findById(req.params.id,function(err,payment){
			if(err){
				res.json({info:'Error finding the Payment'});
			}
			if(payment){
				_.merge(payment,req.body);
				payment.save(function(err){
					if(err){
						res.json({info : 'Error in saving new Payment'});
					}
					res.json({info : 'Payment saved successfully'});
				});
			}
		});
	});

	/* Delete */
	app.delete('/payment/:id',function(req,res){
		Payment.findByIdAndRemove(req.params.id,function(err){
			if(err){
				res.json({info:'Failed to delete Payment'});
			}
			res.json({info:'Payment deleted successfully'});
		});
	});
};