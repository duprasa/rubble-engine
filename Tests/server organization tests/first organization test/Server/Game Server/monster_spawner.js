/*== Monster Spawner Module ==*/

//Status: -1 (Empty as fuck)
//This module decides when to use other modules to validate gameData
//or alter the game, it is the heart of the game server and decides what
//the game actually does.



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
			logger.warn("Key: " + key + " cannot be assigned an undefined value in module: monster_spawner.");
		}
	} else {
		logger.warn("Key: " + key + " doesn't exist in module: monster_spawner.");
	}
};

var update = function() {
	if(settings.moduleEnabled["monster_spawner"] == false) {
		return;
	}
	
	//Probably uses maps and monsters to determine where spawns are needed.
	for(var i in this.gameData.monsters) {
		logger.info(this.gameData.monsters[i]);
	}
};


//Exports
exports.update = update;
exports.set = set;