// racecarlog/app.js : Race Car Log Application
(function() {
	var app = angular.module('rclog', []);
	
	//
	// service: 	imageService
	// description: serves image source urls
	//
	app.factory('imageService', ImageService);

	//
	// model: 		 carModel
	// description:  The race car data model
	//
	app.service('carModel', RaceCarModel);	

	//
	// controller: 	RaceCarGridController
	// description: Controls the data grid that displays the race car log
	//
	app.controller( 'RaceCarGridController', ['$scope', '$rootScope', 'carModel', 'imageService', RaceCarGridController]);

	//
	// controller: RaceCarFormController
	// description: Controls the race car form
	//
	app.controller('RaceCarFormController', ['$scope', '$rootScope', RaceCarFormController]);

	//
	// directives
	//
	app.directive('raceCarTitle', RaceCarTitleDirective);
	app.directive('raceCarGrid',  RaceCarGridDirective);
	app.directive('raceCarForm',  RaceCarFormDirective);	
	
})();