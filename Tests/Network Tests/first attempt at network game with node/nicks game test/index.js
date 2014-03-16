var server = require("./server");
var router = require("./router");
var game = require("./game");
var requestHandlers = require("./requestHandlers");


/*handle contains the functions we will call to deal
  with the request matching the key value */
var handle = {};
handle["/"] = requestHandlers.client;
handle["/client"] = requestHandlers.client;


//special handlers
handle[404] = requestHandlers.notFound;
handle['scripts'] = requestHandlers.scripts;
handle['images'] = requestHandlers.images;

game.start(server.start(router.route , handle));
