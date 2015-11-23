// gridController.js
var RaceCarGridController = function($scope, $rootScope, carModel, imageService) {
	var gridCtrl = this;

	this.headings = [
    	'Car',
      	'Driver',
      	'Make',
      	'Team',
      	'Sponsor',
      	'Status',
      	'Actions'
    ];

	this.cars = [ 
		{
	      "driver":   "",
	      "number":   "Loading...",
	      "raceteam": "",
	      "make":     "",
	      "sponsor":  "",
	      "status":   ""
	    }
    ];

   	this.data = {};
	this.selected = null;

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
    
	// load cars from model
	carModel.all().then(
			function(result) {				
				// setTimeout( 
				// function(result, $scope, gridCtrl) {			
					console.log('loading race car log model...');					
					$scope.title  = result.data.logName;				
					gridCtrl.load(result.data);
				// }
				// , 2000, result, $scope, gridCtrl);
			}

	);

	this.load = function(data) {
		gridCtrl.data = data;
		gridCtrl.cars = data.cars;
	};

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