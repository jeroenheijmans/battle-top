var battleTop = (function (my) {
	"use strict";

	my.util = my.util || {};
	my.util.dice = my.util.dice || {};

	Date.prototype.getFormattedTime = function () {
		var hours = (this.getHours() < 10 ? "0" : "") + this.getHours();
		var mins = (this.getMinutes() < 10 ? "0" : "") + this.getMinutes();
		var secs = (this.getSeconds() < 10 ? "0" : "") + this.getSeconds();
		return hours + ":" + mins + ":" + secs;
	};
	
	return my;
}(battleTop || {}));