window.addEventListener('load',function(){

    //set up the canvas 
    var socket = io.connect();
    var canvas = document.getElementById('theGame');
    var screen = new Screen(canvas,700,700);
    var eventHandler = new EventHandler(canvas);
    var physicsEngine = new PhysicsEngine();
    var onlinePlayers = {};
    //create test Entities
    var entities = [];
    physicsEngine.entities = entities;
    for(var i = 1; i < 10;i++){
        for(var j = 1; j < 10;j++){
            var wall = new Wall(i * 100, j * 100,50,50);
            entities.push(wall);
        }
    }
    for(var i = 1 ; i < 0;i++){
        for(var j = 1; j < 0;j++){
            var hole = new Hole(i * 100 + 50, j * 100 + 50,40,40);
            entities.push(hole);
        }
    }

    for(var i = 1 ; i < 0;i++){
        for(var j = 1; j < 0;j++){
            var box = new Box(i * 100 +  50, j * 100 + 50,40,40);
            entities.push(box);
        }
    }
    socket.on('newMsg', function (message) {
        document.getElementById("chat").innerHTML = message + document.getElementById("chat").innerHTML;
    });

    document.getElementById("say").onclick = function () {
        socket.emit('newMessage',document.getElementById("said").value);
        document.getElementById("said").value = "";
    };

    socket.on('socketId',function(socketId){

        var player = new Player(-100,-100,20,20,'#BADA55',socketId);
        entities.push(player);
        socket.emit('newPlayer',player.location);

        socket.on('newPlayerLocations',function(players){
            //change all online player locations
            for( playerId in players){
                if(playerId !== player.playerName){
                    if(playerId in onlinePlayers){
                        onlinePlayers[playerId].location.x = players[playerId].x;
                        onlinePlayers[playerId].location.y = players[playerId].y;
                    }else{
                        var aPlayer = new OnlinePlayer(players[playerId].x,players[playerId].y,20,20,'#BADA55',playerId)
                        onlinePlayers[playerId] = aPlayer;
                        entities.push(aPlayer);
                    }
                }
            }

        });
        socket.on('playerJoined',function(idLocation){
            //add a player to the online players
            console.log(idLocation);
            var id = idLocation.id;
            var location = idLocation.location;
            var player = new OnlinePlayer(location.x,location.y,20,20,'#BADA55',id)
            onlinePlayers[id] = player;
            entities.push(player);
        });
        socket.on('playerLeft',function(id){
            //detele player from the online players
            for (var i = 0; i < entities.length; i++) {
                if(entities[i] === onlinePlayers[id]){
                    entities.splice(i,1);
                    break;
                }
            };
            delete onlinePlayers[id];
        });
        (function gameLoop(){
            var d = new Date();
            var timeDifference = 0;
            //get player locations from server
            physicsEngine.loop(eventHandler.isPressed);
            socket.emit('playerMove',{x:player.location.x,y:player.location.y});
            //SERVER: tell server player location
            //check time interval
            timeDifference = new Date() - d;
            if(timeDifference > 16){
                console.log('WARNING SLOW LOGIC: game is running slow: ' + timeDifference + 'ms');
            }
            requestAnimFrame(function(){
                var d = new Date();
                var timeDifference = 0;
                //do drawing on screen
                screen.clear();
                for(var index in entities){
                    entities[index].animate(screen,camera);
                }
            });
            setTimeout(gameLoop,(1000/60));
        })();
        //create camera
        var camera = new Camera(screen,player);

        //add events
        eventHandler.onKeyDown(function(e,isPressed){
            //these events should execute in the game loop
            if(e.keyCode == 90){
                player.boost(isPressed);
            }
        });
    });



});