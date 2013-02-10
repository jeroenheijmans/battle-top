var battleTop = (function (my) {
	my.viewModels = my.viewModels || {};
	
	my.viewModels.battleTopViewModel = function (data) {
		var self = this;
		var extraMappingInfo = {
			'combat' : {
				create : function(options) {
					return new my.viewModels.combatViewModel(options.data);
				}
			}
		};
	
		self.toggleAboutInfo = function() {
			self.showAboutInfo(!self.showAboutInfo());
		};
		
		ko.mapping.fromJS(data, extraMappingInfo, self);
		
		self.isDirty = ko.observable(false);
	};
	
	return my;
}(battleTop || {}));