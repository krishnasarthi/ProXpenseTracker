var appModule =  angular.module('xpenseTrakApp', ['ngRoute']);


appModule.config(['$locationProvider','$routeProvider',
		function config($locationProvider,$routeProvider){
			$routeProvider
				.when('/',{
					templateUrl: 'views/transaction.html',
					controller : 'mainController'
				})
				.when('/category',{
					templateUrl: 'views/category.html',
					controller : 'categoryController'
				})
				.when('/test',{
					templateUrl: 'views/test.html',
					controller : 'testController'
				})
				 .otherwise({
                    redirectTo: '/'
                });
		}
		]);
