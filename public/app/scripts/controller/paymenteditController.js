appModule.
controller('paymenteditController',[
	'$scope',
	'$log',
	'$route',
	'$routeParams',
	'dataService',
	function($scope,$log,$route,$routeParams,dataService){
		$scope.paymentId = $routeParams.id;

		dataService.getPaymentById($routeParams.id).success(function (res){
			if(res && res.data){
				$log.debug(res);
			}
		}).error(function(err){
			$log.debug(err);
		});

		/*(function(){*/


/*			$http.get('/payment/' + $routeParams.id)*/


/*			.success(function (res) {*/


/*				if(res && res.data){*/


/*					$log.debug(res);*/


/*				}*/


/*			})*/


/*			.error(function (err) {*/


/*				$log.debug(err);*/


/*			});*/
/*		})();*/


	}]);  
