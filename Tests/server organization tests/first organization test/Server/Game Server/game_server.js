/*== Game Server Module ==*/

//Status: 2 (needs additions/editing)
//This is the root of the game, it launches the main gameloop.



//Imports
var gameData     = require("./game_data");
var gameLoop     = require("./game_loop");
var settings     = require("./server_settings");
var clientEvents = require("./client_events");
var database     = require("./database");
var logger       = require("./logger");


//Game Server start
var start = function(socketServer) {

	if(settings.moduleEnabled["game_server"] == false) {
		return;
	}

	logger.info("Server Started With Modules: ");
	settings.listModules();

	database.load(gameData);
	clientEvents.init(gameData, socketServer);
	gameLoop.start(gameData, socketServer);

};


//Exports
exports.start = start;