var Player = Entity.subClass({
    init: function(x,y,width,height,color){
        this._super(x,y,height,width,color);
        this.collision.fixed = false;
        this.boostProps = {chargeTime: 3, //in seconds
                           velocity: 20,
                           isCharged: true};
        this.maxvelocity.x = 10;
        this.maxvelocity.y = 10;
        this.accel.x = 10;
        this.decel.x = 10;
        this.accel.y = 10;
        this.decel.y = 10;  
    }
});

Player.prototype.doActions = function(isPressed){
    //if can move
    if(isPressed.up){
        //move Up
        if((this.velocity.y - this.accel.y) >= -this.maxvelocity.y){
            this.velocity.y -= this.accel.y;
        }             
    }
    if(isPressed.down){
        //move Down
        if((this.velocity.y + this.accel.y) <= this.maxvelocity.y){
            this.velocity.y += this.accel.y;
        }
    }
    if(isPressed.left){
        // move Left
        if((this.velocity.x - this.accel.x) >= -this.maxvelocity.x){
            this.velocity.x -= this.accel.x;
        }         
    }
    if(isPressed.right){
        // move Right
        if((this.velocity.x + this.accel.x) <= this.maxvelocity.x){
            this.velocity.x += this.accel.x;
        }  
    }
};

Player.prototype.boost = function(isPressed){
    if(!isPressed.z){
        if (isPressed.up){
            this.velocity.y = -this.boostProps.velocity;
        }else if(isPressed.down){
            this.velocity.y = this.boostProps.velocity;
        }
        if (isPressed.left){
            this.velocity.x = -this.boostProps.velocity;
        }else if(isPressed.right){
            this.velocity.x = this.boostProps.velocity;
        }
    }
};
