var Player = Entity.subClass({
    init: function(x,y,width,height,color,playerName){
        this._super(x,y,height,width,color);
        this.playerName = playerName;
        this.collision.fixed = true;
        this.boostProps = {chargeTime: 3, //in seconds
                           velocity: 20,
                           isCharged: true};
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
