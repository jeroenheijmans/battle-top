var battleTop = (function (my) {
	"use strict";
	
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
		
		var defaults = {
            showAboutInfo: false,
            combat: {}
        };
        
        data = $.extend({}, defaults, data);
		
		ko.mapping.fromJS(data, extraMappingInfo, self);
	
		self.toggleAboutInfo = function() {
			self.showAboutInfo(!self.showAboutInfo());
		};
	};
	
	return my;
}(battleTop || {}));