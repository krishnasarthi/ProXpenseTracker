appModule
.controller('transactionsController',[
	'$scope',
	'$log',
	'$route',
	'$controller',
	'$location',
	'dataService',
	function($scope,$log,$route,$controller,$location,dataService){
		var tableCtrl = $controller('tableController',{$scope:$scope});

		// initialization code for controller
		(function(){
			dataService.getPayment()
			.success(function (res) {
				if(res && res.data){
					$scope.transactions = res.data;
					$scope.totalItems = res.data.length;
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

			dataService.deletePayment(transaction._id)
			.success(function(res){
				$log.debug('success ' + res);
				$scope.refresh();
			})
			.error(function(err){
				$log.debug('error ' + err);
			});
		}

		$scope.editTransaction = function(transaction){
			var transaction_detail_url = '/editpayment/' + transaction._id;
			$location.url(transaction_detail_url);
		}
	}]);
