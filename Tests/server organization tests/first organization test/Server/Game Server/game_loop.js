/*== Game Data Module ==*/

//Status: 1 (needs to be implemented AND defined)
//This module decides when to use other modules to validate gameData
//or alter the game, it is the heart of the game server and decides what
//the game actually does.


//Imports
var settings = require("./server_settings");
var logger   = require("./logger");

//Game logic modules Imports
var physics         = require("./physics");
var collisionEvents = require("./collision_events");
var monsterSpawner  = require("./monster_spawner");
var clientUpdate    = require("./client_update");


var start = function(gameData, socketServer) {
	
	if(settings.moduleEnabled["game_loop"] == false) {
		return;
	}

	//Make all modules reference the same gameData or socketServer
	physics.set('gameData',gameData);
	collisionEvents.set('gameData',gameData);
	clientUpdate.set('gameData',gameData);
	clientUpdate.set('socketServer',socketServer);
	monsterSpawner.set('gameData',gameData);


	//TODO: SetTimeout with proper logic. Is it running too slow? etc.
	setInterval(loop,1000/60); 

	
	function loop() {

		var collisions = physics.update();
		collisionEvents.update(collisions);
		clientUpdate.update();
		monsterSpawner.update();
		//Go through some more logic modules.
	};

};


exports.start = start;