appModule
.controller('mainController', [
  '$scope', 
  '$log',
  '$route', 
  '$controller',
  'dataService',
  function ($scope,$log,$route,$controller,dataService) {
    var datepickerCtrl = $controller('datepickerController',{$scope:$scope});

    $scope.paymentTypes = [];
    $scope.categories = [];
    $scope.subcategories = [];
    $scope.amount = 0;

    defaultOption = [{_id:-1,name:'No category found'}];

    (function(){
      dataService.getCategory()
      .success(function (res) {
       if(res && res.data){
         $scope.categories = res.data;
         $scope.category = res.data[0];
         $scope.getSubCategory();
         $log.debug(res);
       }
     })
      .error(function (err) {
       $log.debug(err);
     });

      dataService.getPaymentType()
      .success(function (res) {
        if(res && res.data){
          $scope.paymentTypes = res.data;
          $scope.paymentType = res.data[0];
          $log.debug(res);
        }
      })
      .error(function (err) {
        $log.debug(err);
      });
    })();

    $scope.getSubCategory = function(){
      if($scope.category){
        var selectedCategory = $scope.category._id;
        var category = {
          _id:$scope.category._id,
          name:$scope.category.name
        };

        dataService.getSubCategoryByCategory($scope.category)
        .success(function (res) {
          if(res && res.data){
            if(res.data.length == 0){
              $scope.subcategories = defaultOption;
              $scope.subcategory =  defaultOption[0];
            }else{
              $scope.subcategories = res.data;
              $scope.subcategory = res.data[0];
              $log.debug(res);
            }
          }
        })
        .error(function (err) {
         $log.debug(err);
       });
      }
    }

    $scope.refresh = function(){
      $route.reload();
    }

    $scope.savePayment = function(){
      var payment = {
        amount : $scope.amount,
        paymentDate : $scope.transactionDate,
        description : $scope.description,
        category : {
          categoryId: $scope.category._id,
          name: $scope.category.name
        },
        subCategory : {
          subcategoryId:$scope.subcategory._id,
          name:$scope.subcategory.name
        },
        paymentType : {
          paymentId:$scope.paymentType._id,
          name:$scope.paymentType.name
        }
      }

      dataService.savePayment(payment)
      .success(function(res){
        $log.debug('success ' +  res);
        $scope.refresh();
      })
      .error(function(err){
        $log.debug('error ' +  err);
      });
    }
  }]);
