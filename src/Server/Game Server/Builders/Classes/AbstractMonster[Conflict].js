var ib = require('../ItemBuilder');
var ab = require('../AbilityBuilder');
var data = require('../../Data');
var log  = require('../../../Utility/Logger').makeInstance('Abstract Monster');

function AbstractMonster() {

}

//Static properties defaults
AbstractMonster.prototype.type = 'MONSTER';



AbstractMonster.prototype.die = function() {
	
	var drops = [];
	var biggestDamage = { player : false ,damage : 0 };
	
	for(var nickname in this.damageTaken) {
		//TODO: Allies
		if(data.players[nickname]) {
			data.players[nickname].stats.exp += Math.ceil(this.exp * this.damageTaken[nickname] / this.stats.maxHP);
			
		} else {
			log.warn('No such player with nickname "' + nickname + '" exists. Cant award EXP.');
		}

		if(this.damageTaken[nickname] > biggestDamage.damage) {
			biggestDamage.player = nickname;
			biggestDamage.damage = this.damageTaken[nickname];
		}
	}
	//calculate monster drops
	for(var i in this.drops) {
		var randomNumber = Math.random() * 100
		var roll = randomNumber - ((data.players[nickname]) ? data.players[nickname].stats.LUK : 0);//tbd
		if(this.drops[i] >= roll) {
			var drop = ib.create(i,this.x,this.y,this.map);
			drop.owner = biggestDamage.player;
			drops.push(drop);
		}
	}
	if(data.players[biggestDamage.player]) {
		data.players[biggestDamage.player].stats.monstersKilled += 1;
	}
	delete data.monsters[this.id];
	data.maps[this.map].removeEntity(this);
};

AbstractMonster.prototype.touch = function (player) {
	if(this.old || player.old) {
		return;
	}

	// for boxes
	if(this.touchDamage === 0){
		return;
	}
	var damageDealt = Math.max(this.touchDamage - ((data.players[player.nickname]) ? player.stats.DEF : 0),0);
	player.recentDamage.push(damageDealt);
	player.stats.HP -= damageDealt;
	if(player.damageTaken[this.id]) {
		player.damageTaken[this.id] += damageDealt;
	} else {
		player.damageTaken[this.id] = damageDealt;
	}

	//Monsters will chase after players touching them!
	this.target = player.nickname;
	if(this.status != "DIEING") {
		this.status = "ATTACKED";
	}

	if(player.stats.HP <= 0) {
		player.old = true;
		player.stats.HP = 0;
	}
};

AbstractMonster.prototype.update = function(deltaTime) {
	if(this.new) {
    	this.new = false;
  	}

	if(this.old) {
		this.die();
		return;
	}

	this.recentDamage = [];
	
	//If target is too far.... forget it.
	if(this.status === "ATTACKED" || this.status === "DIEING") {
		if(data.players[this.target]) {
			//use math.abs
			// if((this.target.x - this.x) > 500 || (this.target.x - this.x) < (-500)) {
			// 	this.status = "CALM";
			// 	this.target = null;
			// }
		} else {
			this.status = "CALM";
		}
	}
	switch(this.behavior[this.status].attack){
		// case "FOLLOW_ATTACK":
  //           var vx = data.players[this.target].x - this.x;
  //           var vy = data.players[this.target].y - this.y;
  //           var negativeOffset; // determine if rotated left or right
  //           var imageOffset = (Math.PI/2);//because rotation 0 is on right and not up
  //           if(vx < 0){
  //               negativeOffset = Math.PI;
  //           }else{
  //               negativeOffset = 0;
  //           }
  //           this.rotation = Math.atan(vy/vx) + imageOffset + negativeOffset ;
		// 	if(data.players[this.target] && data.players[this.target].map == this.map) {
		// 		if(this.x < data.players[this.target].x) {
		// 			this.x += this.stats.SPD;
		// 		} else {
		// 			this.x -= this.stats.SPD;
		// 		}
		// 		if(this.y < data.players[this.target].y) {
		// 			this.y += this.stats.SPD;
		// 		} else {
		// 			this.y -= this.stats.SPD;
		// 		}

		// 	} else {
		// 		this.status = "CALM";
		// 	}
		// 	this.attackTime -= deltaTime;
		// 	if(this.attackTime < 0){
		// 		this.attackTime = this.stats.DEX
		// 		var ability = ab.create(this.attack,this.x,this.y,this.map);
		// 		ability.owner = this.id;
		// 		ability.rotation = this.rotation;
		// 	}
		// 	break;
		case "ATTACK":
			this.attackTime -= deltaTime;
			if(this.attackTime < 0){
				this.attackTime = this.stats.DEX
				var ability = ab.create(this.attack,this.x,this.y,this.rotation,this.map);
				ability.owner = this.id;
			}
			break;
		case "RANDOM_ATTACK":
			this.attackTime -= deltaTime;
			if(this.attackTime < 0){
				this.attackTime = this.stats.DEX
				var ability = ab.create(this.attack,this.x,this.y,Math.random() * Math.PI * 2,this.map);
				ability.owner = this.id;
			}
			break;
		case "DOUBLE_ATTACK":
			this.attackTime -= deltaTime;
			if(this.attackTime < 0){
				this.attackTime = this.stats.DEX
				var ability = ab.create(this.attack,this.x,this.y,this.rotation,this.map);
				ability.owner = this.id;
				
				var ability = ab.create(this.attack,this.x,this.y,this.rotation - Math.PI,this.map);
				ability.owner = this.id;
				
			}
			break;
		case "QUAD_ATTACK":
			this.attackTime -= deltaTime * 2;
			if(this.attackTime < 0){
				this.attackTime = this.stats.DEX
				var ability = ab.create(this.attack,this.x,this.y,this.rotation,this.map);
				ability.owner = this.id;
				var ability = ab.create(this.attack,this.x,this.y,this.rotation - Math.PI,this.map);
				ability.owner = this.id;
				var ability = ab.create(this.attack,this.x,this.y,this.rotation - Math.PI /2,this.map);
				ability.owner = this.id;
				var ability = ab.create(this.attack,this.x,this.y,this.rotation + Math.PI/2,this.map);
				ability.owner = this.id;
			}
			break;
		case "QUAD_ATTACK_WITH_BOMBS_AND_SHOOTING":
			this.attackTime -= deltaTime * 2;
			if(this.attackTime < 0){
				this.attackTime = this.stats.DEX
				var ability = ab.create(this.attack,this.x,this.y,this.rotation,this.map);
				ability.owner = this.id;
				var ability = ab.create(this.attack,this.x,this.y,this.rotation - Math.PI,this.map);
				ability.owner = this.id;
				var ability = ab.create(this.attack,this.x,this.y,this.rotation - Math.PI /2,this.map);
				ability.owner = this.id;
				var ability = ab.create(this.attack,this.x,this.y,this.rotation + Math.PI/2,this.map);
				ability.owner = this.id;
				var ability = ab.create("PASTE_SHOT",this.x,this.y,this.rotation,this.map);
				ability.owner = this.id;
				var ability = ab.create("PASTE_SHOT",this.x,this.y,this.rotation - Math.PI,this.map);
				ability.owner = this.id;
				var ability = ab.create("PASTE_SHOT",this.x,this.y,this.rotation - Math.PI /2,this.map);
				ability.owner = this.id;
				var ability = ab.create("PASTE_SHOT",this.x,this.y,this.rotation + Math.PI/2,this.map);
				ability.owner = this.id;
				var ability = ab.create("BOMB_SETUP",this.x,this.y,this.rotation + Math.PI/2,this.map);
				ability.owner = this.id;
			}
			break;
	}	
	switch(this.behavior[this.status].movement){
		case "FOLLOW":
            var vx = data.players[this.target].x - this.x;
            var vy = data.players[this.target].y - this.y;
            var negativeOffset; // determine if rotated left or right
            var imageOffset = (Math.PI/2);//because rotation 0 is on right and not up
            if(vx < 0){
                negativeOffset = Math.PI;
            }else{
                negativeOffset = 0;
            }
            this.rotation = Math.atan(vy/vx) + imageOffset + negativeOffset ;
			if(data.players[this.target] && data.players[this.target].map == this.map) {
				if(this.x < data.players[this.target].x) {
					this.x += this.stats.SPD;
				} else {
					this.x -= this.stats.SPD;
				}
				if(this.y < data.players[this.target].y) {
					this.y += this.stats.SPD;
				} else {
					this.y -= this.stats.SPD;
				}

			} else {
				this.status = "CALM";
			}
			break;
		case "TELEPORT_TO_PLAYER":
			this.moveTime -= deltaTime;
			if(this.moveTime < 0){
				this.moveTime = 1;
				if(data.players[this.target] && data.players[this.target].map == this.map) {
					if(Math.floor(Math.random() - 0.5)){
						if(Math.floor(Math.random() - 0.5)){
							this.x = data.players[this.target].x + 100;
						}else{
							this.x = data.players[this.target].x - 100;
						}
						this.y = data.players[this.target].y;
					}else{
						if(Math.floor(Math.random() - 0.5)){
							this.y = data.players[this.target].y + 100;
						}else{
							this.y = data.players[this.target].y - 100;
						}
						this.x = data.players[this.target].x;
					}

				} else {
					this.status = "CALM";
				}

	            var vx = data.players[this.target].x - this.x;
	            var vy = data.players[this.target].y - this.y;
	            var negativeOffset; // determine if rotated left or right
	            var imageOffset = (Math.PI/2);//because rotation 0 is on right and not up
	            if(vx < 0){
	                negativeOffset = Math.PI;
	            }else{
	                negativeOffset = 0;
	            }
	            this.rotation = Math.atan(vy/vx) + imageOffset + negativeOffset ;

				
			}
			break;
		case "SPIN_FOLLOW":
			this.rotation += 0.05;
			if(data.players[this.target] && data.players[this.target].map == this.map) {
				if(this.x < data.players[this.target].x) {
					this.x += this.stats.SPD;
				} else {
					this.x -= this.stats.SPD;
				}
				if(this.y < data.players[this.target].y) {
					this.y += this.stats.SPD;
				} else {
					this.y -= this.stats.SPD;
				}

			} else {
				this.status = "CALM";
			}
			break;
	}	

	//monsters should refill hp if not damaged for a while
};


module.exports = AbstractMonster;

