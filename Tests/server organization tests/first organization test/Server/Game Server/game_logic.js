/*== Game Logic Module ==*/

//Status: 0 (To be implemented AND defined)
//The game logic module defines settings for the actual
//game logic. but nothing related to the game server itself
//it specifies many business rules about the game




var monsters = {
	MAX_SPAWN_PER_MAP : 6
};

var players = {
	LOGIN_INVINSIBILITY_SECS: 30,
	LOGOUT_AFTER_COMBAT_TIME: 10
};

var users = {
	MAX_LENGTH_USERNAME : 26
};

var drops = {
	TIME_BEFORE_VANISH : 150
}


//Exports
exports.monsters = monsters;
exports.players = players;
exports.users = users;
exports.drops = drops;