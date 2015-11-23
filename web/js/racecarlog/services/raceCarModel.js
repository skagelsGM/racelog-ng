// carModel.js
var RaceCarModel = function($http) {
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
};