var template = require('swig');
var url = require('url');
var server = require('http').createServer(handler);
var io = require('socket.io').listen(server);


var counter = 0;
function handler(req,res){
  var tmpl,html,path;
  path = url.parse(req.url).pathname.toLowerCase();
  console.log(path);
  if(path != '/socket.io/socket.io.js'){
    switch(path){
      case /\.css$/.test(path) && path :
        res.writeHead(200,{'Content-Type':'text/css'});
        tmpl = template.compileFile(__dirname + '/style/' + path);
        html = tmpl.render();   
        res.write(html);
        break;
      case /\.js$/.test(path) && path :
        res.writeHead(200,{'Content-Type':'text/javascript'});
        tmpl = template.compileFile(__dirname + '/javascript/' + path);
        html = tmpl.render();   
        res.write(html);
        break;
      case '/':
        res.writeHead(200,{'Content-Type':'text/html'});
        counter += 1;
        tmpl = template.compileFile(__dirname + '/game.html');
        html = tmpl.render({name:counter});
        res.write(html);
        break;
    }
  }else{console.log('not serving socket io');}
  res.end();
}
server.listen(80);
var players = {};

io.set('close timeout', 7);
io.set('log level', 1);

io.sockets.on('connection', function (socket) {
  var date = new Date();
  console.log(date + " " + socket.id + ' has connected');
  socket.emit('socketId',socket.id);

  socket.on('newPlayer',function(location){
    var date = new Date();
    console.log(date + " " + socket.id + ' has joined the game');
    players[socket.id] = {x:location.x,y:location.y};
    socket.broadcast.emit('playerJoined',{id: socket.id, location:{x:location.x,y:location.y}});

  });

  socket.on('playerMove',function(location){
    //console.log(socket.id + ' has moved')
    players[socket.id] = location;
  });

  socket.on('newMessage',function(location){
    //console.log(socket.id + ' has moved')
    io.sockets.emit('newMsg','<p>' + location + '</p>');
  });

  socket.on('disconnect',function(){
    var date = new Date();
    console.log(date + " " + socket.id + ' has disconnected')
    delete players[socket.id]
    socket.broadcast.emit('playerLeft',socket.id);

  });

});

(function updateUsers(){
  io.sockets.emit('newPlayerLocations',players);
  setTimeout(updateUsers,1000/60);
})();