appModule.
controller('paymenteditController',[
	'$log',
	'$routeParams',
	'dataService',
	function($log,$routeParams,dataService){
		var vm = this;
		vm.singleTransaction = null;
		var _defaultOption = [{_id:-1,name:'No category found'}];
		
		vm.categoryChangeEvent = function(){
			dataService.getSubCategoryByCategory(vm.singleTransaction.category)
			.success(function(res){
				if(res && res.data && res.data.length > 0){
					vm.subCategories = res.data;
					vm.singleTransaction.subCategory = res.data[0];
				}
				else{
					vm.subCategories = _defaultOption;
					vm.singleTransaction.subCategory =  _defaultOption[0];
				}
			})
			.error(function(err){
				$log.log('Error in getting categories ' + err);
			});
		}

		vm.savePayment = function(){
			$log.log(vm.singleTransaction);

			var payment = {
				amount : vm.singleTransaction.amount,
				paymentDate : vm.singleTransaction.paymentDate,
				description : vm.singleTransaction.description,
				category : {
					categoryId: vm.singleTransaction.category._id,
					name: vm.singleTransaction.category.name
				},
				subCategory : {
					subcategoryId:vm.singleTransaction.subCategory._id,
					name:vm.singleTransaction.subCategory.name
				},
				paymentType : {
					paymentId:vm.singleTransaction.paymentType._id,
					name:vm.singleTransaction.paymentType.name
				}
			}

			dataService.updatePayment(vm.singleTransaction._id,payment)
			.success(function(res){
				$log.log('Payment updated successfully .........');
			})
			.error(function(err){
				$log.log('Error in updating Payment ' + err);
			});

		}

		var init = function() {
			dataService.getCategory()
			.success(function(res){
				vm.categories = res.data;
			})
			.error(function(err){
				$log.log('Error in getting categories ' + err);
			});

			dataService.getPaymentType()
			.success(function(res){
				vm.paymentTypes = res.data;
			})
			.error(function(err){
				$log.log('Error in getting payment types ' + err);
			});

			dataService.getSubCategory()
			.success(function(res){
				vm.subCategories = res.data;
			})
			.error(function(err){
				$log.log('Error in getting sub categories ' + err);
			});

			dataService.getPaymentById($routeParams.id).success(function (res){
				if(res && res.data){
					vm.singleTransaction = res.data;
					$log.debug(res);

					for(var i=0;i<vm.categories.length;i++){
						if(vm.categories[i]._id == vm.singleTransaction.category.categoryId){
							vm.singleTransaction.category = vm.categories[i];
							break;
						}
					}

					for(var i=0;i<vm.subCategories.length;i++){
						if(vm.subCategories[i]._id == vm.singleTransaction.subCategory.subcategoryId){
							vm.singleTransaction.subCategory = vm.subCategories[i];
							break;
						}
					}

					for(var i=0;i<vm.subCategories.length;i++){
						if(vm.paymentTypes[i]._id == vm.singleTransaction.paymentType.paymentId){
							vm.singleTransaction.paymentType = vm.paymentTypes[i];
							break;
						}
					}
				}
			}).error(function(err){
				$log.debug(err);
			});
		}

		init();

	}]);  
