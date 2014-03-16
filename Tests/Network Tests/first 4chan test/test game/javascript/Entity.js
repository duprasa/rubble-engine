var Entity = Object.subClass({
    init: function(x,y,width,height,color){
        this.location = {x:x || 10,
                         y:y || 10};
        this.size     = {height:height || 10,
                         width :width || 10};
        this.color    = color || "black";
        this.velocity = {x:0,
                         y:0};
        this.collision = {ignore:false,//other entities wont collide with this
                          fixed:false,// other entites cant push this
                          ghost:false};// collisions will register but entities wont react
        //CONSTANTS
        this.maxvelocity = Object.create({},{x:{writable:false, value:10},
                                             y:{writable:false, value:10}});
        this.accel =       Object.create({},{x:{writable:false, value:2},
                                             y:{writable:false, value:2}});
        this.decel =       Object.create({},{x:{writable:true, value:1},
                                             y:{writable:true, value:1}});
    }
});

Entity.prototype.move = function(){
    //move entity
    if (this.velocity.x){
        this.location.x += this.velocity.x;
        //decel velocity
        if(this.velocity.x > 0){
            this.velocity.x -= this.decel.x;
        }else{
            this.velocity.x += this.decel.x;
        }
    }
    if (this.velocity.y){
        this.location.y += this.velocity.y;
        //decel velocity
        if(this.velocity.y > 0){
            this.velocity.y -= this.decel.y;
        }else{
            this.velocity.y += this.decel.y;
        }
    }
};

Entity.prototype.getLeft = function(){
    return this.location.x;
};
Entity.prototype.getTop = function(){
    return this.location.y;
};
Entity.prototype.getRight = function(){
    return this.location.x + this.size.width;
};
Entity.prototype.getBottom = function(){
    return this.location.y + this.size.height;
};
Entity.prototype.getMidX = function(){
    return (this.size.width / 2) + this.location.x;
};
Entity.prototype.getMidY = function(){
    return (this.size.height / 2) + this.location.y;
}

Entity.prototype.animate = function(screen,camera){ 
    screen.drawRect(Math.round(this.location.x) + camera.offsetX(),
                    Math.round(this.location.y) + camera.offsetY(),
                    this.size.width,
                    this.size.height,
                    this.color);
};

Entity.prototype.onCollision = function(colEntity,direction){
    //Default Collision behavior used with Player and Box
    if(colEntity.collision.ghost){
        this.color = "black";
        return;
    }
    var newlocation;
    switch(direction){
        case 'x':
            if(colEntity.collision.fixed){
                //Stop Entity
            }else{
                //push Entity
                colEntity.velocity.x = this.velocity.x;
            }
            this.velocity.x = 0;
            break;
        case 'y':             
            if(colEntity.collision.fixed){
                //Stop Entity
            }else{
                //push Entity
                colEntity.velocity.y = this.velocity.y;
            }
            this.velocity.y = 0;
            break;
    }
};

Entity.prototype.doActions = function(isPressed){
    //console.log(this.constructor.name + ':unused doActions function')
};