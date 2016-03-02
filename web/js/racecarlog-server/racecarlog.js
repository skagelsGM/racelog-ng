var fs = require('fs');
var jsonfile = require('jsonfile');
jsonfile.spaces = 2;
var DATA_HOME = './data/';

function get(name, callback) {
	jsonfile.readFile( getPath(name), callback);
}

function put(name, json, callback) {
	jsonfile.writeFile( getPath(name), json, callback);	
}


function getPath(name) {
	return DATA_HOME+name+'.json';
}


exports.put = put;
exports.get = get;