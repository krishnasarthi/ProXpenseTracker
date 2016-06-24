appModule
  .controller('mainController', ['$scope', '$http', function ($scope, $http) {
        $scope.paymentTypes = [];
        $scope.categories = [];
        $scope.subcategories = [];
        $scope.amount = 0;
        
        var _date = new Date();
        var day = _date.getDate();
        var month = _date.getMonth();
        var year = _date.getFullYear();
        $scope.transactionDate = day + '/' + month + '/' + year;
        defaultOption = [{_id:-1,name:'No category found'}];


        $http.get('/paymenttype')
            .success(function (res) {
                if(res && res.data){
                    $scope.paymentTypes = res.data;
                    $scope.paymentType = res.data[0];
                    console.log(res);
                }
            })
            .error(function (err) {
                console.log(err);
        });

        $http.get('/category')
           .success(function (res) {
               if(res && res.data){
                   $scope.categories = res.data;
                   $scope.category = res.data[0];
                   $scope.getSubCategory();
                   console.log(res);
               }
           })
           .error(function (err) {
               console.log(err);
        });

        $scope.getSubCategory = function(){
            if($scope.category){
                var selectedCategory = $scope.category._id;
                $http.get('/subcategory/null/' + selectedCategory)
                .success(function (res) {
                if(res && res.data){
                    if(res.data.length == 0){
                        $scope.subcategories = defaultOption;
                       $scope.subcategory =  defaultOption[0];
                    }else{
                          $scope.subcategories = res.data;
                       $scope.subcategory = res.data[0];
                       console.log(res);
                    }
               }
            })
                .error(function (err) {
               console.log(err);
           });
            }
        }

        $scope.savePayment = function(){
          // var amount =  $scope.amount;
          // var notes = $scope.note;
          // var paymentDate = new Date();
          // var Category = {categoryId : $scope.category._id, name : $scope.category.name};
          // var SubCategory = {subcategoryId : $scope.subcategory._id, name : $scope.subcategory.name};
          // var PaymentType = {paymentType : $scope.paymentType._id, type : $scope.paymentType.type};
          // console.log(amount + ',' + notes + ',' + paymentDate + ', ' + Category + ', ' + SubCategory + ', ' + PaymentType);

          $http.post('/payment',$scope.paymentForm).
            success(function(res){
                console.log('success ' +  res);
            })
            .error(function(err){
                console.log('error ' +  err);
            });
        }

        $scope.AddCategory = function(){
          alert('Please redirect to Add Category screen');
        }
     }
]);
