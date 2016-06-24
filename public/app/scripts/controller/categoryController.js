appModule
.controller('categoryController', ['$scope', '$http','$log','$route', function ($scope, $http, $log, $route) {
        $scope.category = {
            id : '',
            name : ''
        };

        $scope.categoryId = '';

        $scope.flag = false;

        $scope.updateCategory = function(param){
            $log.debug(param);
            $scope.category = {
                id : param._id,
                name : param.name
            };
             $scope.flag = true;
        }

        $scope.deleteCategory = function(param){
            $log.debug(param);
            $scope.category = {
                id : param._id,
                name : param.name
            };
            $http.delete('/category/' + $scope.category.id,$scope.category).
             success(function(res){
                    $log.debug('success ' + res);
                    $scope.refresh();
                }).
                error(function(err){
                    $log.debug('error ' + err);
                });
        }

        $scope.refresh = function(){
            $route.reload();
        }

        $http.get('/category')
            .success(function (res) {
                if(res && res.data){
                    $scope.categories = res.data;
                    $log.debug(res);
                }
            })
            .error(function (err) {
                $log.debug(err);
        });

    	$scope.saveCategory = function(){
            if($scope.category.id){ 
                 $http.put('/category/' + $scope.category.id,$scope.category).
                success(function(res){
                    $log.debug('success ' + res);
                    $scope.refresh();
                }).
                error(function(err){
                    $log.debug('error ' + err);
                })
            }else{ 
                $http.post('/category',$scope.category).
                success(function(res){
                    $log.debug('success ' + res);
                    $scope.refresh();
                }).
                error(function(err){
                    $log.debug('error ' + err);
                })
            }

    		
    	};


    }]);