/*== Physics Module ==*/

//Status: -1 (Empty as fuck)
//This module checks for collisions and adds them to a queue,
//it is also in charge of updating locations of players and monsters
//using their nextLocation property, this module returns the list of collisions.



var settings = require("./server_settings");
var logger   = require("./logger");

this.gameData = {};

var set = function(key,value) {
	if(this[key]) {
		if(value) {
			this[key] = value;
		}
		else {
			logger.warn("Key: " + key + " cannot be assigned an undefined value in module: physics.");
		}
	} else {
		logger.warn("Key: " + key + " doesn't exist in module: physics.");
	}
};

var update = function(gameData) {

	if(settings.moduleEnabled["physics"] == false) {
		return null;
	}

	//Empty
	return collisions;
};


exports.set = set;
exports.update = update;