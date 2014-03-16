/*== Client Events Module ==*/

//Status 0: (To be implemented AND defined)
//The client events module defines the actions to take when events such as
//Disconnect, connect, or different types of messages come directly
//from the client.



//Imports
var settings = require("./server_settings");
var logger   = require("./logger");


var init = function(gameData, socketServer) {

	if(settings.moduleEnabled["client_events"] == false) {
		return;
	}

	socketServer.sockets.on('connection', function(socket) {
		logger.info('client connected. Id: ' + socket.id);	
	});


	logger.info("Client events initialized.");
};


//Exports
exports.init = init;