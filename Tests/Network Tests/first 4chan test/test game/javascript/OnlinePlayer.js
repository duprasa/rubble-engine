var OnlinePlayer = Entity.subClass({
    init: function(x,y,width,height,color,playerName){
        this._super(x,y,height,width,color);
        this.playerName = playerName;
        this.collision.fixed = true;
        this.boostProps = {chargeTime: 3, //in seconds
                           velocity: 20,
                           isCharged: true};
    }
});
