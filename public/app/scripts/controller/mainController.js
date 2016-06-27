appModule
.controller('mainController', ['$scope', '$http','$log','$route', function ($scope, $http,$log,$route) {
  $scope.paymentTypes = [];
  $scope.categories = [];
  $scope.subcategories = [];
  $scope.amount = 0;

  defaultOption = [{_id:-1,name:'No category found'}];

  (function(){
    $http.get('/category')
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

    $http.get('/paymenttype')
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

      $http.get('/subcategory/null/' + $scope.category._id + '/' + $scope.category.name)
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

    $http.post('/payment',payment).
    success(function(res){
      $log.debug('success ' +  res);
      $scope.refresh();
    })
    .error(function(err){
      $log.debug('error ' +  err);
    });
  }

//------------------------------------------Scope for date-picker ------------------------------------------------------

$scope.today = function() {
    $scope.transactionDate = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.transactionDate = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.transactionDate = new Date(year, month, day);
  };

  $scope.format = 'MM/dd/yyyy';
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

}
]);
