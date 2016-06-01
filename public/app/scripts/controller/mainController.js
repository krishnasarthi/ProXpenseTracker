angular
    .module('xpenseTrakApp', [])
    .controller('mainController', ['$scope', '$http', function ($scope, $http) {
        $scope.paymentTypes = [];
        $scope.categories = [];
        $scope.subcategories = [];

        $http.get('/paymenttype')
            .success(function (res) {
                $scope.paymentTypes = res;
                console.log(res);
            })
            .error(function (err) {
                console.log(err);
            });

            $http.get('/category')
            .success(function (res) {
                $scope.categories = res;
                    $scope.category = $scope.categories.data[0].value;
                console.log(res);
            })
            .error(function (err) {
                console.log(err);
            });

             $http.get('/subcategory')
            .success(function (res) {
                $scope.subcategories = res;
                console.log(res);
            })
            .error(function (err) {
                console.log(err);
            });
     }
]);
