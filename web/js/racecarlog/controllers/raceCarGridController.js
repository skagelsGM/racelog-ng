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
		// update persistent store, too
		carModel.save(gridCtrl.log).then(
			function(result) {
				console.log('[rootScope.updateSelected] response from save request: %s', result.data.status);
			}
		);
	};

	$rootScope.removeSelected = function() {
		gridCtrl._removeSelected();
		carModel.save(gridCtrl.log).then(
			function(result) {
				console.log('[rootScope.removeSelected] response from save request: %s', result.data.status);
			}
		);
	};

	$rootScope.add = function(car) {
		$scope.cars.push(car);
		// update persistent store, too
		carModel.save(gridCtrl.log).then(
			function(result) {
				console.log('[rootScope.add] response from save request: %s', result.data.status);
			}
		);
	}
    
    //
	// Controller Functions
	//

	// load car log from model
	carModel.all().then( 
		function successCallback(result) {				
			console.log('[raceCarGridController.init] loading race car log model...');					
			gridCtrl.load(result.data);
		},

		function errorCallback(result) {
			console.err('[raceCarGridController.init] unable to load race car log from service... service not available at this time...');
			carModel.allFromCache().then(
				function(result) {				
					console.log('[raceCarGridController.init] loading race car log model from local cache...');					
					gridCtrl.load(result.data);
				});
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

	// public interface to remove the currently selected car
	this.removeSelected = function() {
		$rootScope.removeSelected();
	};

	// private method to remove the currently selected car
	this._removeSelected = function() {
		if ($scope.selected === null) {
			console.log("[raceCarGridController._removeSelected] Error: Cannot remove selected car. No car is currently selected in the grid. ");
			return;
		}
	
		gridCtrl.remove($scope.selected);
		$scope.selected = null;
	};	

	// update the currently selected car	
	this.updateSelected = function(car) {
		if ($scope.selected === null) {
			console.log("[raceCarGridController.updateSelected] Error: Cannot update selected car. No car is currently selected in the grid. ");
			return;
		}

		gridCtrl._removeSelected();
		$scope.cars.push(car);
		$scope.selected = null;		
	};		       

};