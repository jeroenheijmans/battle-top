var battleTop = (function (my) {
	my.viewModels = my.viewModels || {};

	my.viewModels.conditionViewModel = function (data) {
		var self = this;
		
		self.name = ko.observable("");
		self.roundsLeft = ko.observable(1);
		
		self.roundsLeftIndication = ko.computed(function() {
			return '(' + self.roundsLeft() + '↺)';
		}, self);
		
		ko.mapping.fromJS(data, {}, self);
	};
	
	return my;
}(battleTop || {}));