var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));

app.use(express.static(path.join(__dirname,'./public/app')));


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expensedb');

var category = require('./server/route/category.js')(app);
var subcategory = require('./server/route/subcategory.js')(app);
var paymenttype = require('./server/route/paymenttype.js')(app);
var paymenttype = require('./server/route/payment.js')(app);

// app.get('/components',function(req,res) {
// 	res.sendFile(path.join(__dirname,'./public/components/angular/angular.js'));
// });

app.get('*',function(req,res) {
	res.sendFile(path.join(__dirname,'./public/app/index.html'));
});

var server = app.listen(3000,function(){
	console.log('Server running at http://127.0.0.1:3000');
});