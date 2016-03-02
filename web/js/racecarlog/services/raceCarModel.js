// carModel.js
var RaceCarModel = function($http) {
	var service = this;
	var SERVICE_URL = 'http://localhost:8080/racecarlog/max';

	service.all = function() {
		// load cars from $http
		return $http.get(SERVICE_URL)
			.then(
				function(result){
					return result;
				}
			);
	};

	service.allFromCache = function() {
		// load cars from local cache
		return $http.get('data/racecarlog.json')
			.then( function(result){
				return result;
			});	
		
	};

	service.save = function(data) {
		// first, save to local cache

		// persist to service
		return $http.put(SERVICE_URL, data).
			success(function(data, status, headers, config) {
				console.log("[raceCarModel.save] Race car log saved. status: %s, data: %s", status, JSON.stringify(data));
			}).
			error(function(data, status, headers, config) {
				console.log("[raceCarModel.save] ERROR\t race car log failed to update service, status: %s, data: %s", JSON.stringify(data) );
			});
	};

};