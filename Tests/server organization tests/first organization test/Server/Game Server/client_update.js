/*== Client Update Module ==*/

//Status: -1 (Empty as fuck)
//This module is in charge of updating the minimum
//necessary for each client so they know what is 
//going on in their maps and on the maps around them
//as well as their friends' and allies' positions.



//Imports
var settings = require("./server_settings");
var logger   = require("./logger");

this.gameData = {};
this.socketServer = {};

var set = function(key,value) {
	if(this[key]) {
		if(value) {
			this[key] = value;
		}
		else {
			logger.warn("Key: " + key + " cannot be assigned an undefined value in module: client_update.");
		}
	} else {
		logger.warn("Key: " + key + " doesn't exist in module: client_update.");
	}
};


var update = function() {
	if(settings.moduleEnabled["client_update"] == false) {
		return;
	}

	//Send messages to peeps about updated locations. and other stuff.
};


//Exports
exports.update = update;
exports.set = set;