var battleTop = (function (my) {
	"use strict";
	
	my.viewModels = my.viewModels || {};
	
	my.viewModels.hpChangeViewModel = function (data) {
		var self = this;
		
		data = data || {};
		data.hpChangeType = data.hpChangeType || 'damage';
		data.hpChangeAbsolute = data.hpChangeAbsolute || 1;
		
		ko.mapping.fromJS(data, null, self);
		
		self.hpChangeTotal = ko.computed(function() {
			return parseInt(self.hpChangeType() === 'damage' ? -self.hpChangeAbsolute() : self.hpChangeAbsolute(), 10);
		});
	};
	
	return my;
}(battleTop || {}));