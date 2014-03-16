var PhysicsEngine = Object.subClass({
    init: function(){
        this.entities = [];
        var isPaused = false;
        this.pause = function(){
            isPaused = true;
        };
        this.resume = function(){
            isPaused = false;
        };
        this.loop = function(isPressed){
            if(!isPaused){
                var e1, e2;
                //iterate through every entity
                for(var index in this.entities){
                    var hasCollided =false;
                    e1 = this.entities[index];
                    //do actions
                    e1.doActions(isPressed);
                    if(!(e1.collision.ignore || (e1.velocity.x === 0 && e1.velocity.y === 0))){  
                        //Test for collisions
                        for(var index2 in this.entities){  
                            e2 = this.entities[index2];          
                            if (index2 !== index && !e2.collision.ignore){
                                //check if future e1 intersects with e2
                                if(((e1.location.x + e1.velocity.x + e1.size.width > e2.location.x) && (e1.location.x + e1.velocity.x < e2.location.x + e2.size.width )) &&
                                   ((e1.location.y + e1.velocity.y + e1.size.height > e2.location.y) && (e1.location.y + e1.velocity.y < e2.location.y + e2.size.height))){
                                    //collision detected!
                                    hasCollided = true;
                                    var dx = (e2.getMidX() - e1.getMidX()) / (e2.size.width / 2); //get normalized sides
                                    var dy = (e2.getMidY() - e1.getMidY()) / (e2.size.width / 2); //get normalized sides
                                    var absDX = Math.abs(dx);
                                    var absDY = Math.abs(dy);
                                    if(absDX > absDY){
                                        e1.onCollision(e2,'x');
                                        if(dx < 0){
                                            e1.location.x = e2.getRight();
                                        }else{
                                            e1.location.x = e2.getLeft() - e1.size.width;
                                        }
                                    }else{
                                        e1.onCollision(e2,'y');
                                        if(dy < 0){
                                            e1.location.y = e2.getBottom();
                                        }else{
                                            e1.location.y = e2.getTop() - e1.size.height;
                                        }
                                    }
                                }

                            }
                        }
                        e1.move();
                    }
                }
            }
        };
    }
});