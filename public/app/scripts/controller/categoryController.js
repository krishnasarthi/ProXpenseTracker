appModule
.controller('categoryController', [
    '$scope', 
    'dataService',
    '$log',
    '$route', 
    '$controller',
    function ($scope, dataService, $log, $route,$controller) {
        var tableCtrl = $controller('tableController',{$scope:$scope});
        (function(){
            dataService.getCategory()
            .success(function (res) {
                if(res && res.data){
                    $scope.categories = res.data;
                    $log.debug(res);
                }
            })
            .error(function (err) {
                $log.debug(err);
            });
        })();

        var _flag = false;

        $scope.category = {
            id : '',
            name : ''
        };

        $scope.categoryId = '';        

        $scope.showTemplate = function(){
            return _flag;
        }

        $scope.cancelTemplate = function(){
            _flag = false;
        }

        $scope.addTemplate = function(){
            _flag = true;
        }

        $scope.updateCategory = function(param){
            $log.debug(param);
            $scope.category = {
                id : param._id,
                name : param.name
            };
            _flag = true;
        }

        $scope.deleteCategory = function(param){
            $log.debug(param);
            $scope.category = {
                id : param._id,
                name : param.name
            };
            dataService.deleteCategory(param._id).
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

        $scope.saveCategory = function(){
            if($scope.category.id){ 
             dataService.updateCategory($scope.category.id,$scope.category).
             success(function(res){
                $log.debug('success ' + res);
                $scope.refresh();
            }).
             error(function(err){
                $log.debug('error ' + err);
            })
         }else{ 
            dataService.saveCategory($scope.category).
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