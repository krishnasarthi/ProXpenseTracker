appModule.
controller('tableController',['$scope','$log',function($scope,$log){
	$scope.sortType = '';
	$scope.sortReverse = false;
	$scope.sort = function(key){
		$scope.sortType = key;
		$scope.sortReverse = !$scope.sortReverse;
	}
}]);