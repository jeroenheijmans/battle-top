var battleTop = (function (my) {
	my.viewModels = my.viewModels || {};

	my.viewModels.conditionViewModel = function (data) {
		var self = this;
		
		var defaults = { 
            name: "",
            roundsLeft: 1
        };
		
        data = $.extend({}, defaults, data);
        
		ko.mapping.fromJS(data, {}, self);
		
		self.roundsLeftIndication = ko.computed(function() {
			return '(' + self.roundsLeft() + '↺)';
		}, self);
		
	};
	
	return my;
}(battleTop || {}));