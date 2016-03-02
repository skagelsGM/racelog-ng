// racecarlogTest.js
var rclog = require("./racecarlog.js");
var key = "max";
var json = { name: "max" };
rclog.put(key, json);

rclog.get(key, function (err, obj) {
	if (err) {
		console.log("[server] Error getting Race Car Log '"+key+"'. " + err);
	} else {
		console.log("[server]  Race Car Log '"+key+"':");
		console.dir(obj);
	}
});
