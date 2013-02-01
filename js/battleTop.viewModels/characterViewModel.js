var battleTop = (function (my) {
	my.viewModels = my.viewModels || {};
	
	my.viewModels.characterViewModel = function (data) {
		var self = this;
		var extraMappingInfo = {
			'conditions' : {
				create : function(options) {
					return new my.viewModels.conditionViewModel(options.data);
				}
			}
		};
		
		self.name = ko.observable("");
		self.currentHitPoints = ko.observable();
		self.maxHitPoints = ko.observable();
		self.currentInitiative = ko.observable();
		self.initiativeModifier = ko.observable();
		self.initiativeState = ko.observable("normal");
		self.characterType = ko.observable("PC");
		self.conditions = ko.observableArray();
		
		self.isExpanded = ko.observable(false);
		
		self.toggleExpandedState = function() {
			self.isExpanded(!self.isExpanded());
		};
		
		self.beginTurn = function() {
			var conditions = self.conditions();
			for (i = conditions.length-1; i >= 0; i--) {
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
			var maxHpString = self.maxHitPoints() === undefined ? "" : '/' + self.maxHitPoints().toString();
			return self.currentHitPoints().toString() + maxHpString;
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
		
		ko.mapping.fromJS(data, extraMappingInfo, self);
	};
	
	return my;
}(battleTop || {}));