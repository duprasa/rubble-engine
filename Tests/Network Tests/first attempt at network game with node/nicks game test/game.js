

function Player () {
	this.x = 0;
	this.y = 0;
	this.name = 'Default';
	this.socket = null;
}
var getNextMonsterId = (function () {
	var id = 0;
	return function() {
		if(id > 1000000) {
			id = 0;
		}
		return id++;

	}
})();



function Monster() {
	this.id = getNextMonsterId();
	this.x = 0;
	this.y = 0;
	this.name = "Simple Shape";
	this.direction = "right";
}

Monster.prototype.update = function() {
	if(this.x >= 100) {
		this.direction = "left";
	}
	if(this.x <= 0) {
		this.direction = "right";
	}
	switch(this.direction) {
		case "right":
			this.x += 1;
		break;
		case "left":
			this.x -= 1;
		break;
	}
};

var players = {};
var monsters = {};
var monster2 = new Monster();
monster2.y = 100;
monsters[monster2.id] = monster2;

var randomName = (function () {
	var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var letterArray = letters.split("");
	var length = 6;
	return function () {
		var returnString = "";
		for(var i = 0; i < length; i++) {
			returnString += letterArray[Math.floor(Math.random() * letterArray.length)];
		}
		return returnString;
	}
})();

exports.start = function (io) {
	io.sockets.on(
	    'connection', function (socket) {
		console.log('client connected!');


		var playersToSend = [];
		for(i in players) {
			playersToSend.push({
				name : players[i].name,
				x : players[i].x,
				y : players[i].y
			});
		}


		var player = new Player();
		player.x = 100;
		player.y = 100;
		player.lastX = 100;
		player.lastY = 100;
		player.name = randomName();
		player.socket = socket;
		players[socket.id] = player;

		socket.emit('initSelf', player.name);
		socket.emit('initMonsters', monsters);
		socket.emit('initPlayers', playersToSend);

		console.log(socket.id);
		console.log("Player Joined the Game. Name: " + player.name);
		socket.broadcast.emit('playerConnected', {name : players[socket.id].name,
												  x : players[socket.id].x,
												  y : players[socket.id].y	 });
		
		socket.on('moved', function(message) {
				players[socket.id].x = message.x;
				players[socket.id].y = message.y; 
				console.log(message.x, message.y);
		});
		
		socket.on('disconnect',function() {
			console.log('The client has disconnected!');
			
			
			console.log(players[socket.id].name + " disconnected.");
			socket.broadcast.emit('playerDisconnected', {name : players[socket.id].name });
			delete players[socket.id];
		});
		
	});

	//Server gameloop.
	setInterval(game, 1000 / 60);

	function game() {
		for(i in monsters) {
			monsters[i].update();
		}
		var playersToSend = [];
		for(i in players) {
			if(parseInt(players[i].x) != players[i].lastX || parseInt(players[i].y) != players[i].lastY )
			{
				players[i].lastX = parseInt(players[i].x);
				players[i].lastY = parseInt(players[i].y);
				playersToSend.push({
					name : players[i].name,
					x : players[i].x,
					y : players[i].y
				});
			}
		}

		for(i in players) {
			players[i].socket.emit('monsterUpdate', monsters);
			players[i].socket.emit('playerUpdate', { content : playersToSend});
		}

	}
		//Remember you can't do players.length atm.
	}
