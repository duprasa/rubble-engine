/*== Server Settings Module ==*/

//Status: 2 (Needs additions/editing)
//The server settings module takes care of settings regarding modules,
//Ex: Enabling modules, disabling modules, adding modules,
//or any settings that have to do with the game server. it does NOT
//take care of any game logic rules or settings.



var logImportance = 3;

var moduleEnabled = {
	"game_server" : true,
	"game_loop" : true,
	"logger" : true,
	"database" : true,
	"client_events" : true,
	"client_update" : false,
	"physics" : false,
	"collision_events" : false,
	"monster_spawner" : true,
};


var listModules = function() {
	var count = 0;
	var totalCount = 0;
	for(i in moduleEnabled) {
		totalCount++;
		if(moduleEnabled[i] == true) {
			console.log(i + " module");
			count++;
		}
	}
	console.log("total modules: " + count + " out of " + totalCount);
}


//Exports
exports.logImportance = logImportance;
exports.moduleEnabled = moduleEnabled;
exports.listModules = listModules;