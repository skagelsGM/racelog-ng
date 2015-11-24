// directives:
// - title
// - grid
// - race car editor form
var RaceCarTitleDirective = function(){
	return {
		restrict: 'E',
		templateUrl: 'js/racecarlog/views/race-car-title.html'			
	}
};

var RaceCarGridDirective = function(){
	return {
		restrict: 'E',
		templateUrl: 'js/racecarlog/views/race-car-grid.html'			
	}
};

var RaceCarFormDirective = function() {
	return {
		restrict: 'E',
		templateUrl: 'js/racecarlog/views/race-car-form.html'
	};
};