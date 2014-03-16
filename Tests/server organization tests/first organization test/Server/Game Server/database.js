/*== Database Module ==*/

//Status: 0 (To be implemented AND defined)
//The database module is the layer in between the game and
//any sort of persistant datastoring related to players, default
//maps or saving any player progress it also loads such such things.



//Imports
var settings = require("./server_settings");


var load = function(gameData) {

	if(settings.moduleEnabled["database"] == false) {
		return;
	}

	//TODO: Actually load stuff from MongoDB database or MySql
	gameData.players["1"] = "nick";
	gameData.players["2"] = "sam";
	gameData.monsters["19"] = "slender man";

}



//Exports
exports.load = load;