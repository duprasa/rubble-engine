/*== Collision Events module ==*/

//Status: -1 (Empty as fuck)
//This module says what things do when they collide with each other.
//It uses the collision list obtained from the physics module.



//Imports
var rules    = require("./game_logic");
var settings = require("./server_settings");
var logger   = require("./logger");


this.gameData = {};

var set = function(key,value) {
	if(this[key]) {
		if(value) {
			this[key] = value;
		}
		else {
			logger.warn("Key: " + key + " cannot be assigned an undefined value in module: collision_events.");
		}
	} else {
		logger.warn("Key: " + key + " doesn't exist in module: collision_events.");
	}
};

var update = function(collisions) {
	if(settings.moduleEnabled["collision_events"] == false || (collisions == null))  {
		return;
	}

	//Empty
};


exports.update = update;
exports.set = set;