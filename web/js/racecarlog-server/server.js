// server.js
var rclog 	= require("./racecarlog.js");
var http 	= require('http');
var url 	= require('url');
var CONTEXT = "/racecarlog/";

http.createServer(function (req, res) {
	var urlInfo = url.parse(req.url, true, true);
	var pathname = urlInfo.pathname;
	var method = req.method;

	if (pathname.startsWith(CONTEXT)) {
		switch (method) {
			case "GET":
				doGet(req, res, pathname);
				break;
			case "POST":
				// to technically be RESTful, POST when you don't know the resource ID (key), so in this case you would post a log to /racecarlog/
			case "PUT":
				// PUT a race car log for the given key
				doPost(req, res, pathname);
				break;
			default:
				var msg = method + " is an unsupported method for " + pathname + "\nREQUEST:\n\n" + urlInfo
				error(msg);
				res.writeHead(404);
				res.end(msg);				
		}
	} else {
		var msg = "Resource not found: " + pathname
		error(msg);
		res.writeHead(404);
		res.end(msg);
	}
}).listen(8080);

// GET /racecarlog/<key> - send race car log associated with key
function doGet(req, res, pathname) {
	log("REQUEST\tGET\t" + pathname);

	var key = getKeyFromPathname(pathname);
	var content = rclog.get(key, function (err, obj) {
		if (err) {
			console.log("[server] Error getting Race Car Log '"+key+"'. " + err);
		} else {
			console.log("[server]  Race Car Log '"+key+"':");
			// console.dir(obj);			
			res.writeHead(200);
			res.end(JSON.stringify(obj));
		}
	});	
}

// POST/PUT /racecarlog/<key> - save json content to race car log associated with key
function doPost(req, res, pathname) {
	log("REQUEST\tPOST\t" + pathname);
	
	var key = getKeyFromPathname(pathname);
	var content = "";

	req.on('data', function (chunk) {
		content += chunk;
	});

	req.on('end', function () {
		var racecarlog = JSON.parse(content);
    
    	// TODO: test key in json content
		if (key.length == 0) {
			key = racecarlog.key;
		}

		// save race car log
		rclog.put(key, racecarlog, function(err) {
			if (err) {
				error("Error saving Race Car Log '" + key + "'. " + err);
				res.writeHead(500);
				var result = {
					status: "error",
					message: "Unable to save Race Car Log '" + key + "'"
				};
				res.end(JSON.stringify(result));
			} else {
				log("Race Car Log '" + key + "' saved.");
				res.writeHead(200);
				var result = {
					status: "success",
					url: "http://localhost:8080"+CONTEXT+key,
		       	};
				res.end(JSON.stringify(result));
			}
		});
   	});	
}

function getKeyFromPathname(pathname) {
	return pathname.substring(CONTEXT.length);	
}

function error(msg) {
	console.log("[server] ERROR\t"+msg);
}

function log(msg) {
	console.log("[server] LOG\t"+msg);
}
