appModule.
service('dataService',['$http','$log',function($http,$log){
	this.getPaymentById = function(id){
		return $http.get('/payment/' + id);
	}
}]);