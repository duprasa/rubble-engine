/*== Server settings Module ==*/

//Status: 4 (stable)
//This module provides settings for the Http server, the 
//SocketIO server, and the modules enabled that have to 
//do with the server



module.exports = {
	//all modules
	moduleEnabled : {
		GameHandler : true
	},
	//User Validation
	invalidAttemptsTimeout : 2, //in minutes
	loginAttempts : 4, 
	//game server
	gameServer:{
		moduleEnabled :
{			"Loop" : true,
			"Memory" : true,
			"ClientUpdates" : true,
			"ClientEvents" : true,
			"Physics" : true,
			"CollisionEvents" : true,
			"MonsterSpawner" : true
		},
		backupInterval:1, //in minutes.
		FPS:60,
		monsterSpawnRate:20, // in seconds.

	},
	//io server
	ioServer:{
		domain : "192.168.0.101",
		port : 81,
		closeTimeout: 10,
		heartbeatTimeout: 10,
		heartbeatInterval: 5,
		pollingDuration: 5
	},
	//http server
	httpServer:{
		domain : "192.168.0.101",
		port : 82,
		encoding : "utf8"
	},
	//database settings
	dbServer:{
		host     :'192.168.0.101',
		user     : 'root',
		password :'root',
		db       : 'node'
	},
	//logger
	logger:{
		defaultLogLevel : 3,
		logLevel : 1,
		loggingEnabled : true
	}
};
exports.moduleEnabled = {
	"Loop" : true,
	"Database" : true,
	"ClientUpdates" : false,
	"ClientEvents" : false,
	"Physics" : false,
	"CollisionEvents" : false,
	"MonsterSpawner" : true
};