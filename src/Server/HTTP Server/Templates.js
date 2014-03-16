/*== Templates module ==*/

//Status: 4 (stable)
//This module contains all the templates or "views" that the http 
//handlers return to clients, after optionally rendering them with
//specific variables



//Imports
var swig = require("swig");

exports.templates = {
	'game': swig.compileFile(__dirname + '/../../Client/Templates/game.html'),
	'index': swig.compileFile(__dirname + '/../../Client/Templates/index.html'),
	'login': swig.compileFile(__dirname + '/../../Client/Templates/login.html'),
	'register': swig.compileFile(__dirname + '/../../Client/Templates/register.html'),
	'mainMenu': swig.compileFile(__dirname + '/../../Client/Templates/mainMenu.html'),
	'error': swig.compileFile(__dirname + '/../../Client/Templates/error.html'),
	'loading': swig.compileFile(__dirname + '/../../Client/Templates/loading.html'),
	'help': swig.compileFile(__dirname + '/../../Client/Templates/help.html'),
	'credit': swig.compileFile(__dirname + '/../../Client/Templates/credit.html'),
	'incompatible': swig.compileFile(__dirname + '/../../Client/Templates/incompatible.html'),
	'authenticationError': swig.compileFile(__dirname + '/../../Client/Templates/authenticationError.html'),
	'menu': swig.compileFile(__dirname + '/../../Client/Templates/menu.html'),
	'donate': swig.compileFile(__dirname + '/../../Client/Templates/donate.html')
};