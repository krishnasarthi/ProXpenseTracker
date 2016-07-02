var mongoose = require('mongoose');

var _devEnvironment = false;

if(_devEnvironment){
	mongoose.connect('mongodb://localhost/expensedb');
	console.log('connecting to local database..........');
}
else{
	var uri = "mongodb://krishna:aloha123@ds021984.mlab.com:21984/expensedb";
	db = mongoose.connect(uri);
	console.log('connecting to mLabs database..........');
}
