// testClient.js
var http = require('http');
var options = {
	hostname: 'localhost',
	port: '8080',
	path: '/racecarlog/test',
	method: 'POST'
};

function readJSONResponse(response) {
	var responseData = '';
  	
  	response.on('data', function (chunk) {
    	responseData += chunk;
   	});
   	
   	response.on('end', function () {
     	console.log("Raw Response: " + responseData);

     	var dataObj = JSON.parse(responseData);

     	console.log("Status: " + dataObj.status);
     	console.log("Resource URL: " + dataObj.url);
  	});
}

var req = http.request(options, readJSONResponse);
req.write('{ "key":"test", "numberOfCars":4 }');
req.end();