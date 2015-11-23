// directives:
// - title
// - grid
// - race car editor form
var RaceCarTitleDirective = function(){
	return {
		restrict: 'E',
		templateUrl: 'race-car-title.html'			
	}
};

var RaceCarGridDirective = function(){
	return {
		restrict: 'E',
		templateUrl: 'race-car-grid.html'			
	}
};

var RaceCarFormDirective = function() {
	return {
		restrict: 'E',
		templateUrl: 'race-car-form.html'
	};
};