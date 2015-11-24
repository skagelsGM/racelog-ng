// gridController.js
var RaceCarGridController = function($scope, $rootScope, carModel, imageService) {
	var gridCtrl = this;
	var log = {};

	//
    // init $scope
    //
	$scope.headings = [
    	'#',
    	'Car #',
      	'Driver',
      	'Make',
      	'Team',
      	'Sponsor',
      	'Status',
      	'Actions'
    ];

	$scope.cars = [ 
		{
	      "driver":   "",
	      "number":   "Loading...",
	      "raceteam": "",
	      "make":     "",
	      "sponsor":  "",
	      "status":   ""
	    }
    ];
   	
	$scope.selected = null;
	$scope.title = 'Waiting for race car log to load...';

	//
	// init $rootScope
	//
	$rootScope.isGridCtrlInitialized = true;

	$rootScope.updateSelected = function(car) {
		gridCtrl.updateSelected(car);
	};

	$rootScope.removeSelected = function() {
		gridCtrl.removeSelected();
	};

	$rootScope.add = function(car) {
		$scope.cars.push(car);
	}
    
    //
	// Controller Functions
	//

	// load car log from model
	carModel.all().then(
		function(result) {				
			// setTimeout( 
			// function(result, $scope, gridCtrl) {			
				console.log('loading race car log model...');					
				gridCtrl.load(result.data);
			// }
			// , 2000, result, $scope, gridCtrl);
		}
	);

	// load car log into controller
	this.load = function(log) {
		gridCtrl.log = log;
		$scope.title = log.logName;
		$scope.cars = log.cars;
	};
	
	// get car image src url
	this.carImgSrc = function(make) {
		return imageService.getImageSource(make);
    }

    // select car in grid
	this.select = function(car) {
		$scope.selected = car;
		$rootScope.edit(car);
	}

	// remove car from the log
	this.remove = function(car) {			
		var i = $scope.cars.indexOf(car);
		if (i != -1) {
			$scope.cars.splice(i, 1);
		}
	};	

	// remove the currently selected car
	this.removeSelected = function() {
		if ($scope.selected === null) {
			alert("Error: Cannot update selected car. No car is currently selected in the grid. ");
			return;
		}
	
		gridCtrl.remove($scope.selected);
		$scope.selected = null;
	};	

	// update the currently selected car	
	this.updateSelected = function(car) {
		if ($scope.selected === null) {
			alert("Error: Cannot update selected car. No car is currently selected in the grid. ");
			return;
		}

		gridCtrl.removeSelected();
		$scope.cars.push(car);
		$scope.selected = null;
	};		       

};