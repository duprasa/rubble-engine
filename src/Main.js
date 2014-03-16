var childProcess = require('child_process');
var repl   = require('repl');
var log    = require('./Server/Utility/Logger').makeInstance('Main');

log.level = 4;

var httpServerProcess = childProcess.exec('cd ..',[],{ cwd: __dirname,env: process.env});
//var httpServerProcess = childProcess.spawn('node startHttpServer.js',[],{ cwd: __dirname});
//var gameServerProcess = childProcess.spawn('node startGameServer.js');
//repl.start(">");
// httpServerProcess.on('error',function(error){
// 	log.debug(error);
// });
// gameServerProcess.on('error',function(error){
// 	log.debug(error);
// });


//hello nick