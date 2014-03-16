var app = require('http').createServer()
  , io = require('socket.io').listen(app)
  , fs = require('fs');

app.on('request',function (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
});

app.listen(80);
var nextUserId = 1;
//this is where the magic happens
io.sockets.on('connection', function (socket) {
  socket.name = "user" + nextUserId++;
  console.log(socket);
  socket.on('btnClick',function(data){
  	console.log(data);
  	socket.broadcast.emit('receiveMessage',socket.name + ": " + data.message);
  });
});