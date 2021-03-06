appModule
.controller('subcategoryController',[
  '$scope',
  '$log',
  '$route',
  '$controller',
  'dataService',
  function($scope,$log,$route,$controller,dataService) {
    var tableCtrl = $controller('tableController',{$scope:$scope});
    _defaultOption = [{_id:-1,name:'All'}];

        // Initialization code to load categories and sub-categories
        var init =  function(){
          dataService.getSubCategory()
          .success(function (res) {
            if(res && res.data){
              $scope.subcategories = res.data;
              $log.debug(res);
            }
          })
          .error(function (err) {
           $log.debug(err);
         });

          getCategory();

        };

        var getCategory = function(customOption){
         dataService.getCategory()
         .success(function (res) {
           if(res && res.data){
            $scope.categories = res.data;
            $scope.selectedOption = res.data[0];
            $scope.category = res.data[0];
            console.log(res);
          }
        }).error(function (err) {
         console.log(err);
       });
      }

      init();


      $scope.subCategory = {
        id:'',
        name:'',
        category: {
          categoryId:'',
          name:''
        }
      };

      $scope.category = {
        _id: '',
        name: ''
      };

      $scope.categories = [];
      $scope.flag = false;
      $scope.selectedOption = {};

      $scope.refresh = function(){
        $route.reload();
      }

      $scope.showTemplate = function(){
        return $scope.flag;
      }

      $scope.addTemplate = function(){
        $scope.flag = true;
      }

      $scope.cancelTemplate = function(){
        $scope.flag = false;
      }

      $scope.updateSubCategory = function(param){
        $log.debug(param);
        $scope.subCategory = {
          id:param._id,
          name:param.name,
          category: {
            categoryId:param.category.categoryId,
            name:param.category.name
          }
        };

        var categories = $scope.categories;
        var selectedIndex = 0 ;
        for(var i=0;i<categories.length;i++){
          if(categories[i]._id == param.category.categoryId){
            selectedIndex = i;
            break;
          }
        }
        $scope.selectedOption = categories[selectedIndex];
        $scope.flag = true;
      }

      $scope.onCategoryChange = function(){
        $log.debug($scope.category);
      }

      $scope.deleteSubCategory = function(param){
       $log.debug(param);

      /* $scope.subCategory = {
        id : param._id,
        name : param.name,
        category : param.category
      }*/

      dataService.deleteSubCategory(param._id)
      .success(function(res){
        $log.debug('success ' + res);
        $scope.refresh();
      }).
      error(function(err){
        $log.debug('error ' + err);
      });
    };

    $scope.saveSubCategory = function(){
      if($scope.subCategory.id){
        $scope.subCategory.category = $scope.selectedOption;
        dataService.updateSubCategory($scope.subCategory)
        .success(function(res){
          $log.debug('success ' + res);
          $scope.refresh();
        })
        .error(function(err){
          $log.debug('error ' + err);
        })
      }else{
        var newSubCategory = {
          name:$scope.subCategory.name,
          category: {
            categoryId:$scope.selectedOption._id,
            name:$scope.selectedOption.name
          }
        };

        dataService.saveSubCategory(newSubCategory)
        .success(function(res){
          $log.debug('Success ' + res);
          $scope.refresh();
        })
        .error(function(err){
          $log.debug('Error ' + err);
        });
    }
  }
  }]);