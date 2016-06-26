appModule.directive('numbersOnly',function(){
	return {
		restrict : 'A',		// only activate on element attribute
		require : '?ngModel',	// get hold of NgModelController
		link : function(scope,element,attrs,ngModel){
			if(!ngModel) {
				return;
			}

			function validateInput(text){
				if(text){
					var transformedInput = text.replace(/[^0-9\.]/g, '');

					var decimalCheck = transformedInput.split('.');

					if(!angular.isUndefined(decimalCheck[1])){
						decimalCheck[1] = decimalCheck[1].slice(0,2);
						transformedInput = decimalCheck[0] + '.' + decimalCheck[1];
					}

					if (transformedInput !== text) {
						ngModel.$setViewValue(transformedInput);
						ngModel.$render();
					}

					return transformedInput;
				}
				return undefined;
			}

			ngModel.$parsers.push(validateInput);
		}
	}
});