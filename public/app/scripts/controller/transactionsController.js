appModule
.controller('transactionsController',[
	'$scope',
	'$http',
	'$log',
	'$route',
	'$controller',
	'$location',
	function($scope,$http,$log,$route,$controller,$location){
		var tableCtrl = $controller('tableController',{$scope:$scope});

		$scope.totalItems = 0;
		$scope.currentPage = 1;
		$scope.maxSize = 5;

		$scope.pageChanged = function() {
			$log.log('Page changed to: ' + $scope.currentPage);
		};

		// initialization code for controller
		(function(){
			$http.get('/payment')
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

			$http.delete('/payment/' + transaction._id).
			success(function(res){
				$log.debug('success ' + res);
				$scope.refresh();
			}).
			error(function(err){
				$log.debug('error ' + err);
			});
		}

		$scope.editTransaction = function(transaction){
			var transaction_detail_url = '/editpayment/' + transaction._id;
			$location.url(transaction_detail_url);
		}
	}]);
