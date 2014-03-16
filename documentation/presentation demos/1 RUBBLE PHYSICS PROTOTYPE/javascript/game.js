function help(){
    //show player faster
    console.log('change player.maxvelocity.x = 10;');
    console.log('change player.maxvelocity.y = 10;');
    //show player rediculously fast
    console.log('change player.maxvelocity.x = 100;');
    console.log('change player.maxvelocity.y = 100;');
    //show player fast with no accel and deccel
    console.log('change player.maxvelocity.x = 10;');
    console.log('change player.maxvelocity.y = 10;');   
    console.log('change player.accel.x = 10;');
    console.log('change player.decel.x = 10;');
    console.log('change player.accel.y = 10;');
    console.log('change player.decel.y = 10;');
    //change to normal
    console.log('change player.accel.x = 2;');
    console.log('change player.decel.x = 1;');
    console.log('change player.accel.y = 2;');
    console.log('change player.decel.y = 1;'); 
    //show following camera  
    console.log('chamge camera.changeTarget(player);')
    //show camera on first box
    console.log('chamge camera.changeTarget(entities[81]);')
}
window.addEventListener('load',function(){

    //set up the canvas 
    var canvas = document.getElementById('theGame');
    var screen = new Screen(canvas,700,700);
    var eventHandler = new EventHandler(canvas);
     physicsEngine = new PhysicsEngine();

    //create test Entities
    entities = [];
    for(var i = 1; i < 10;i++){
        for(var j = 1; j < 10;j++){
            var wall = new Wall(i * 100, j * 100,50,50);
            entities.push(wall);
            physicsEngine.addEntity(wall);
        }
    }
    for(var i = 1 ; i < 0;i++){
        for(var j = 1; j < 0;j++){
            var hole = new Hole(i * 100 + 50, j * 100 + 50,40,40);
            entities.push(hole);
            physicsEngine.addEntity(hole);
        }
    }

    for(var i = 1 ; i < 10;i++){
        for(var j = 1; j < 10;j++){
            var box = new Box(i * 100 +  50, j * 100 + 50,40,40);
            entities.push(box);
            physicsEngine.addEntity(box);
        }
    }

    player = new Player(-100,-100,20,20,'BADA55');
    entities.push(player);
    physicsEngine.addEntity(player);



    //create camera
    camera = new Camera(screen,{location:{x:0,y:0}});

    //add events
    eventHandler.onKeyDown(function(e,isPressed){
        //these events should execute in the game loop
        if(e.keyCode == 90){
            player.boost(isPressed);
        }
    });

    (function gameLoop(){
        var d = new Date();
        var timeDifference = 0;
        physicsEngine.loop(eventHandler.isPressed);
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
        setTimeout(gameLoop,(1000/64));
    })();



});