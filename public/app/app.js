var appModule =  angular.module('xpenseTrakApp', ['ngRoute']);


appModule.config(['$locationProvider','$routeProvider',
	function config($locationProvider,$routeProvider){
		$routeProvider
		.when('/',{
			templateUrl: 'views/expense.html',
			controller : 'mainController'
		})
		.when('/category',{
			templateUrl: 'views/category.html',
			controller : 'categoryController'
		})
		.when('/subcategory',{
			templateUrl: 'views/subcategory.html',
			controller : 'subcategoryController'
		})
		.when('/paymenttype',{
			templateUrl: 'views/paymenttype.html',
			controller : 'paymenttypeController'	
		}).
		when('/transactions',{
			templateUrl: 'views/expenses.html',
			controller : 'transactionsController'	
		})
		.otherwise({
			redirectTo: '/'
		});
	}
	]);
