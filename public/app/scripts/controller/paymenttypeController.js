appModule.
controller('paymenttypeController',[
	'$scope',
	'$http',
	'$log',
	'$route',
	'$controller',
	function($scope,$http,$log,$route,$controller){
		var tableCtrl = $controller('tableController',{$scope:$scope});
		var _displayFlag = false;

	// get all available payment types
	(function(){
		$http.get('/paymenttype')
		.success(function (res) {
			if(res && res.data){
				$scope.paymentTypes = res.data;
				$log.debug(res);
			}
		})
		.error(function (err) {
			$log.debug(err);
		});
	})();

	$scope.paymentType = {
		id : '',
		name : '',
		description: '',
		insertdate : ''
	};

	$scope.showTemplate = function(){
		return _displayFlag;
	}

	$scope.addTemplate = function(){
		_displayFlag = true;
	}

	$scope.cancelTemplate = function(){
		_displayFlag = false;
	}

	$scope.refresh = function(){
		$route.reload();
	}

	$scope.deletePaymentType = function(paymentType){
		$http.delete('/paymenttype/' + paymentType._id).
		success(function(res){
			$log.debug('success ' + res);
			$scope.refresh();
		}).
		error(function(err){
			$log.debug('error ' + err);
		});
	}

	$scope.savePaymentType = function(){
		//check if insert or update
		if($scope.paymentType._id){
			updateExistingPaymentType();
		}
		else{
			insertNewPaymentType();
		}
	}

	$scope.updatePaymentType = function(paymentType){
		$scope.paymentType = paymentType;
		$log.debug($scope.paymentType);
		_displayFlag = true;
	}

	insertNewPaymentType = function(){
		$scope.paymentType.insertdate = new Date();

		$http.post('/paymenttype',$scope.paymentType).
		success(function(res){
			$log.debug('Success ' + res);
			$scope.refresh();
		}).
		error(function(err){
			$log.debug('Error ' + err);
		})
	}

	updateExistingPaymentType = function(){
		$http.put('/paymenttype/' + $scope.paymentType._id,$scope.paymentType).
		success(function(res){
			$log.debug('success ' + res);
			$scope.refresh();
		}).
		error(function(err){
			$log.debug('error ' + err);
		})
	}
}]);