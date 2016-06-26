appModule
.controller('transactionsController',['$scope','$http','$log','$route',function($scope,$http,$log,$route){
	(function(){
		$http.get('/payment')
		.success(function (res) {
			if(res && res.data){
				$scope.transactions = res.data;
				$log.debug(res);
			}
		})
		.error(function (err) {
			$log.debug(err);
		});
	})();

	$scope.refresh = function(){
		$route.reload();
	}

	$scope.deleteTransaction = function(transaction){
		$log.debug(transaction);

		$http.delete('/payment/' + transaction._id).
		success(function(res){
			$log.debug('success ' + res);
			$scope.refresh();
		}).
		error(function(err){
			$log.debug('error ' + err);
		});
	}
}]);