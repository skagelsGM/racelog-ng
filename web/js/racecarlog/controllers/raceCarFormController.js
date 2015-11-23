// raceCarFormController.js
var carKeys  = ['driver','number','raceteam','make','sponsor','status'];

var RaceCarFormController = function($scope, $rootScope) {
	var carCtrl = this;

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
};