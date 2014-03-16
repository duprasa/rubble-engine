//Imports
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./request_handlers");
var gameServer = require("../Game Server/game_server");

var handle = {};
//File Handlers
handle["/"] = requestHandlers.client;
handle["/client"] = requestHandlers.client;
handle[404] = requestHandlers.notFound;

//special handlers
handle['scripts'] = requestHandlers.scripts;
handle['images'] = requestHandlers.images;
handle['sounds'] = requestHandlers.sounds;
handle['styles'] = requestHandlers.styles;

var socketServer = server.start(router.route , handle);
gameServer.start(socketServer);