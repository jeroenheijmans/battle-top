var battleTop = (function (my) {
	my.util = my.util || {};
	my.util.dice = my.util.dice || {};

	my.util.dice.rollDice = function(sides, number) {
		var result = 0;
		
		if (!sides) {
			sides = 20;
		}
		
		for (i = 0; i < (number ? number : 1); i++) {
			result += Math.floor(Math.random() * (sides + 1)) + 1;
		}
		
		return result;
	};
	
	return my;
}(battleTop || {}));