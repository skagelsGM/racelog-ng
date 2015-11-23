// gridController.js
var RaceCarGridController = function($scope, $rootScope, carModel, imageService) {
	var gridCtrl = this;

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

	// load cars from model
	carModel.all().then(
			function(result) {
				gridCtrl.data = result.data;
				$scope.title  = result.data.logName;
				gridCtrl.cars = result.data.cars;
			}
	);

	// imageService.init();

	this.carImgSrc = function(make) {
		return imageService.getImageSource(make);
    }

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

};