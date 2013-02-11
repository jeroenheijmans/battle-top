var battleTop = (function (my) {
	my.viewModels = my.viewModels || {};

	my.viewModels.conditionViewModel = function (data) {
		var self = this;
		
		
		// Generate defaults.
		data = data || {};
		data.name = data.name || "";
		data.roundsLeft = data.roundsLeft || 1;
		ko.mapping.fromJS(data, {}, self);
		
		self.roundsLeftIndication = ko.computed(function() {
			return '(' + self.roundsLeft() + '↺)';
		}, self);
		
	};
	
	return my;
}(battleTop || {}));