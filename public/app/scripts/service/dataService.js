appModule.
service('dataService',['$http','$log',function($http,$log){

//---------------------- Payment/Transaction API -------------------------------------------
this.getPaymentById = function(id){
	return $http.get('/payment/' + id);
}

this.getPayment = function(){
	return $http.get('/payment');
}

this.deletePayment = function(id){
	return $http.delete('/payment/' + id);
}

this.savePayment = function(payment){
	return $http.post('/payment',payment);
}

this.updatePayment = function(payment){
	return $http.put('/payment',payment);
}

//---------------------------- Category API -----------------------------------------------
this.getCategory = function(){
	return $http.get('/category');
}

this.getCategoryById = function(id){
	return $http.get('/category/' + id);	
}

this.deleteCategory = function(id){
	return $http.delete('/category/' + id);
}

this.saveCategory = function(category){
	return $http.post('/category',category);
}

this.updateCategory = function(id,category){
	return $http.put('/category/' + id,category);
}

//------------------------ Payment Type API ----------------------------------------------
this.getPaymentType = function(){
	return $http.get('/paymenttype');
}

this.deletePaymentType = function(id){
	return $http.delete('/paymenttype/' + id);
}

this.savePaymentType = function(paymenttype){
	return $http.post('/paymenttype',paymenttype);
}

this.updatePaymentType = function(id,paymentType){
	return $http.put('/paymenttype/' + id,paymentType);
}

//-------------------------- SubCategory API ----------------------------------------------
this.getSubCategory = function(){
	return $http.get('/subcategory');
}

this.getSubCategoryByCategory = function(category){
	if(category){
		return $http.get('/subcategory/null/' + category._id + '/' + category.name)
	}

	return null;
}

this.deleteSubCategory = function(id){
	return  $http.delete('/subcategory/' + id);
}

this.saveSubCategory = function(subcategory){
	return $http.post('/subcategory',subcategory);
}

this.updateSubCategory = function(subcategory){
	var _id = subcategory.id;
	return  $http.put('/subcategory/' + _id,subcategory);
}
}]);