(function() {
	var app = angular.module('rclog', []);
	var gridCtrl = null;
	var carCtrl = null;

	var carKeys = ['driver','number','raceteam','make','sponsor','status'];

	//
	// service: imageService
	//
	app.factory('imageService', function() {
		var images = {
		  "Ford":       "http://static.nascar.com/content/dam/nascar/articles/sidebar%20content/Ford.png",
		  "Chevrolet":  "http://static.nascar.com/content/dam/nascar/articles/sidebar%20content/Chevy.png",
		  "Toyota":     "http://static.nascar.com/content/dam/nascar/articles/sidebar%20content/Toyota.png"
		};

		var getImageSource = function(make) {
			return images[make];
		};
		
		return {
			getImageSource: getImageSource
		}
	
	});

	//
	// model: carModel
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

	// todo: provice data service
	// todo: decouple grid controller from race car controller - these should be injected or grabbed from some service, 
	// or there should be some event listeners put in place

	//
	// controller: RaceCarGridController
	//
	app.controller( 'RaceCarGridController', ['carModel', '$scope', 'imageService', function(carModel, $scope, imageService) {
		gridCtrl = this;
		this.data = {};
		$scope.title = 'Waiting for race car log to load...';
		// $scope.updateSelected = function(car) {
		// 	gridCtrl.updateSelected(car);
		// };

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

		// todo: this shold be event driven; decouple from carCtrl
		this.select = function(car) {
			this.selected = car;
			if (carCtrl != null) {
				carCtrl.editCar(car);
			}
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
	//
	app.controller('RaceCarController', function() {
		carCtrl = this;
		this.car = {};
		this.carInGrid = null;

		this.mode = function() {
			if (gridCtrl === null) { return 'init'; }
			return (this.carInGrid === null) ? 'add' : 'update';
		};

		this.show = function(mode) {
			var currMode = 'init';

			if (gridCtrl === null) { 
				currMode = 'init'; 
			} else {
				currMode = (this.carInGrid === null) ? 'add' : 'update';
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
			//$scope.updateSelected(this.car);
			gridCtrl.updateSelected(this.car);
			// reset form
			this.carInGrid = null;
			this.car = {};			
		};

		// update car in the grid
		this.remove = function() {
			gridCtrl.removeSelected(this.car);
			// reset form
			this.carInGrid = null;
			this.car = {};			
		};

		// add car to the grid
		this.add = function() {
			gridCtrl.cars.push(this.car);

			// reset form
			this.car = {};	
		};
	});

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