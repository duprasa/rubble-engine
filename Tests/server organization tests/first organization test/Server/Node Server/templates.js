var swig = require("swig");

exports.templates = {
	'client': swig.compileFile(__dirname + '/../../Client/Templates/client.html')
};