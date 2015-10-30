(function() {
	var app = angular.module('rclog', []);
	var gridCtrl = null;
	var carCtrl  = null;
	var carKeys  = ['driver','number','raceteam','make','sponsor','status'];

	//
	// service: 	imageService
	// description: serves image source urls
	//
	app.factory('imageService', function() {
		var images = {
		  "Ford":       "http://static.nascar.com/content/dam/nascar/articles/sidebar%20content/Ford.png",
		  "Chevrolet":  "http://static.nascar.com/content/dam/nascar/articles/sidebar%20content/Chevy.png",
		  "Toyota":     "http://static.nascar.com/content/dam/nascar/articles/sidebar%20content/Toyota.png",
		  "McDonald's": "http://logodesignconsultant.com/blog/wp-content/uploads/2010/05/mcdonalds-logo.jpg",
		  "M&Ms": "http://www.mars.com/global/assets/images/center-content/mms.png",
		  "Lowe's": "data:image/png;base64,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"
		};

		var getImageSource = function(make) {
			return images[make];
		};
		
		return {
			getImageSource: getImageSource
		}
	
	});

	//
	// model: 		 carModel
	// description:  The race car data model
	//
	app.service('carModel', function($http) {
		var service = this;

		service.all = function() {
			// load cars from $http		
			return $http.get('data/racecarlog.json')
				.then(
					function(result){
						return result;
					}
				);

		};
	});	

	//
	// controller: 	RaceCarGridController
	// description: Controls the data grid for the list of race cars
	//
	app.controller( 'RaceCarGridController', ['$scope', '$rootScope', 'carModel', 'imageService', function($scope, $rootScope, carModel, imageService) {
		gridCtrl = this;

		$scope.title = 'Waiting for race car log to load...';
		$rootScope.isGridCtrlInitialized = true;

		$rootScope.updateSelected = function(car) {
			gridCtrl.updateSelected(car);
		};

		$rootScope.removeSelected = function() {
			gridCtrl.removeSelected();
		};

		$rootScope.add = function(car) {
			gridCtrl.cars.push(car);
		}

		this.data = {};
		this.selected = null;

		this.cars = [ 
			{
		      "driver":   "TEMPLATE",
		      "number":   "",
		      "raceteam": "",
		      "make":     "",
		      "sponsor":  "",
		      "status":   "Active"
		    }
	    ];

	    this.carMakeImgSrc = function(make) {
	    	return imageService.getImageSource(make);
	    }

		// load cars from model
		carModel.all().then(
				function(result) {
					gridCtrl.data = result.data;
					$scope.title  = result.data.logName;
					gridCtrl.cars = result.data.cars;
				}
		);

		this.select = function(car) {
			this.selected = car;
			$rootScope.edit(car);
		}

		// Find and remove car from the log
		this.remove = function(car) {			
			var i = this.cars.indexOf(car);
			if (i != -1) {
				this.cars.splice(i, 1);
			}
		};	

		// remove the currently selected car
		this.removeSelected = function() {
			if (this.selected === null) {
				alert("Error: Cannot update selected car. No car is currently selected in the grid. ");
				return;
			}
		
			this.remove(this.selected);
			this.selected = null;
		};	

		// update the currently selected car	
		this.updateSelected = function(car) {
			if (this.selected === null) {
				alert("Error: Cannot update selected car. No car is currently selected in the grid. ");
				return;
			}

			this.removeSelected();
			this.cars.push(car);
			this.selected = null;
		};		       

	}]);

	//
	// controller: RaceCarController
	// description: Controls the race car editor/form
	//
	app.controller('RaceCarController', ['$scope', '$rootScope', function($scope, $rootScope) {
		carCtrl = this;

		$rootScope.edit = function(car) {
			carCtrl.editCar(car);
		}

		this.car = {};
		this.carInGrid = null;

		this.mode = function() {
			if (!$rootScope.isGridCtrlInitialized) { return 'init'; }
			return (this.carInGrid === null) ? 'add' : 'update';
		};

		this.show = function(mode) {
			var currMode = 'init';

			if ($rootScope.isGridCtrlInitialized) {
				currMode = (this.carInGrid === null) ? 'add' : 'update';
			} else {
				currMode = 'init';
			}

			if (currMode === 'init' || currMode === 'add') {
				return mode === currMode;
			}

			// show all mode buttons
			return true;
		};

		this.editCar = function(car) {
			// populate form
			this.carInGrid = car;
			for (var i in carKeys) {
				var key = carKeys[i];
				this.car[key] = this.carInGrid[key];	
			}			
		};

		// update car in the grid
		this.update = function() {
			$rootScope.updateSelected(this.car);
			// reset form
			this.carInGrid = null;
			this.car = {};			
		};

		// update car in the grid
		this.remove = function() {
			$rootScope.removeSelected(this.car);
			// reset form
			this.carInGrid = null;
			this.car = {};			
		};

		// add car to the grid
		this.add = function() {
			$rootScope.add(this.car);
			// reset form
			this.car = {};	
		};
	}]);

	// directives:
	// - title
	// - grid
	// - race car editor form
	app.directive('raceCarTitle', function(){
		return {
			restrict: 'E',
			templateUrl: 'race-car-title.html'			
		}
	});

	app.directive('raceCarGrid', function(){
		return {
			restrict: 'E',
			templateUrl: 'race-car-grid.html'			
		}
	});

	app.directive('raceCarForm', function() {
		return {
			restrict: 'E',
			templateUrl: 'race-car-form.html'
		};
	});
	
})();