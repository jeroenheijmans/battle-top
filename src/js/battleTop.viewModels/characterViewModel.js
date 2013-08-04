var battleTop = (function (my) {
	"use strict";

	my.viewModels = my.viewModels || {};
	
	my.viewModels.characterViewModel = function (data, combat) {
		var self = this;
		
		var extraMappingInfo = {
			'conditions' : {
				create : function(options) {
					return new my.viewModels.conditionViewModel(options.data);
				}
			}
		};
		
		data = data || {};
		data.id = data.id || 0;
		data.name = data.name || "";
		data.currentHitPoints = data.currentHitPoints || '';
		data.maxHitPoints = data.maxHitPoints || '';
		data.currentInitiative = data.currentInitiative || '';
		data.initiativeModifier = data.initiativeModifier || '';
		data.initiativeState = data.initiativeState || "normal";
		data.characterType = data.characterType || "PC";
		data.conditions = data.conditions || [];
		
		ko.mapping.fromJS(data, extraMappingInfo, self);
		
		self.isExpanded = ko.observable(false);
		self.isActive = ko.computed(function() { return self === combat.activeCharacter(); });
		
		self.toggleExpandedState = function() {
			self.isExpanded(!self.isExpanded());
		};
		
		self.beginTurn = function() {
			var conditions = self.conditions();
			for (var i = conditions.length-1; i >= 0; i--) {
				conditions[i].roundsLeft(conditions[i].roundsLeft() - 1);
			}
			
			self.initiativeState('normal');
		};
	
		self.endTurn = function() {
			// TODO: Conditions should get their own initiative when they're entered, and
			// they should "tick" and "expire" on that initiative. See:
			// http://www.d20srd.org/srd/combat/actionsInCombat.htm#theCombatRound
			// For now though, let's just do it here:
			self.conditions.remove(function(item) { return item.roundsLeft() <= 0; });
		};
		
		self.isPlayerCharacter = ko.computed(function() { return self.characterType() === "PC"; });
		
		self.initiativeModifierAsAside = ko.computed(function() {
			var plusOrMinus = self.initiativeModifier() >= 0 ? '+' : '';
			return '(' + plusOrMinus + self.initiativeModifier() + ')';
		}, self);
		
		self.hitPoints = ko.computed(function() {
			if (self.currentHitPoints() === undefined) {
				return "n/a";
			}
			return self.currentHitPoints();
		}, self);
		
		self.conditionToAdd = ko.observable(new my.viewModels.conditionViewModel());
		
		self.addCondition = function() {
			if (self.conditionToAdd().name() !== "" && self.conditionToAdd().roundsLeft() > 0) {
				self.conditions.push(self.conditionToAdd());
				self.conditionToAdd(new my.viewModels.conditionViewModel());
			}
		};
		
		self.removeCondition = function(condition) {
			self.conditions.remove(condition);
		};
		
		self.isUpdatingHitPoints = ko.observable(false);
		
		self.hpChange = ko.observable(new my.viewModels.hpChangeViewModel());
		
		self.changeHitPoints = function() {
			self.currentHitPoints(self.currentHitPoints() + self.hpChange().hpChangeTotal());
			self.hpChange(new my.viewModels.hpChangeViewModel());
			self.toggleUpdatingHitPoints();
		};
		
		self.toggleUpdatingHitPoints = function() {
			// TODO: Move jQuery hack to ViewModel logic:
			$('#overlay').toggleClass("hidden");
			
			self.isUpdatingHitPoints(!self.isUpdatingHitPoints()); 
		};
	};
	
	return my;
}(battleTop || {}));