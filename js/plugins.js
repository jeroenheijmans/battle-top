// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

(function( $ ) {
	var viewModel = {};
	
	function rollDice(sides, number) {
		var result = 0;
		
		if (!sides) {
			sides = 20;
		}
		
		for (i = 0; i < (number ? number : 1); i++) {
			result += Math.floor(Math.random() * (sides + 1)) + 1;
		}
		
		return result;
	}
	
	var battleTopViewModel = function (data) {
		var self = this;
		ko.mapping.fromJS(data, {}, self);
		
		// Augment view model:
		// TODO
	};
	
	var combatViewModel = function (data) {
		var self = this;
		var extraMappingInfo = {
			'characters' : {
				create : function(options) {
					return new characterViewModel(options.data);
				}
			}
		};
		
		self.isExpanded = ko.observable(false);
		
		self.toggleExpandedState = function() {
			self.isExpanded(!self.isExpanded());
			self.characters().forEach(function (character) { character.isExpanded(self.isExpanded()); });
		};
		
		self.activeCharacter = ko.computed(function() {
			var activeCharacters = self.characters().filter(function(item) { return item.name() == self.activeCharacterName(); });
			if (activeCharacters.length === 1) {
				return activeCharacters[0];
			}
			return undefined;
		}, self);
		
		self.nextCharacter = ko.computed(function() {
			// TODO: Refactor this ugly, ugly bit of code:
			var characters = self.characters();
			var nextCharacter = undefined;
			var currentCharacterIndex = undefined;
			for (i = 0; i <  characters.length; i++) {
				if (characters[i].name() == self.activeCharacter().name()) {
					currentCharacterIndex = i;
				}
			}
			
			if (currentCharacterIndex == undefined || currentCharacterIndex == characters.length-1) {
				nextCharacter = characters[0];
			}
			else {
				nextCharacter = characters[currentCharacterIndex+1];
			}
			return nextCharacter;
		}, self);
				
		self.initiativeSort = function () {
			self.characters.sort(function(a,b) { 
				return b.currentInitiative() == a.currentInitiative() ?
						b.initiativeModifier() - a.initiativeModifier() :
						b.currentInitiative() - a.currentInitiative();
			});
		};

		self.nextRound = function() {
			self.currentRound(self.currentRound() + 1);
			animateCurrentRound();
		};
		
		self.nextTurn = function() {
			var nextCharacter = self.nextCharacter();
			self.activeCharacter().endTurn();
			if (nextCharacter.name() == self.characters()[0].name()) self.nextRound();
			self.activeCharacterName(nextCharacter.name());
			nextCharacter.beginTurn();
		};
		
		self.delayTurn = function() {
			self.activeCharacter().initiativeState('delayed');
			self.nextTurn();
		};
		
		self.readyTurn = function() {
			self.activeCharacter().initiativeState('readied');
			self.nextTurn();
		};
		
		self.removeCharacter = function(character) {
			self.characters.remove(character);
		};
		
		self.characterToAdd = ko.observable(new characterViewModel());
		
		self.addCharacter = function() {
			if (self.characterToAdd().name() !== "") {
				if (self.characterToAdd().initiativeModifier() === undefined) {
					self.characterToAdd().initiativeModifier(0);
				}
				if (self.characterToAdd().currentInitiative() === undefined) {
					self.characterToAdd().currentInitiative(rollDice(20));
				}
				self.characters.push(self.characterToAdd());
				self.characterToAdd(new characterViewModel());
			}
		};
		
		ko.mapping.fromJS(data, extraMappingInfo, self);
		self.initiativeSort();
	};
	
	var characterViewModel = function (data) {
		var self = this;
		var extraMappingInfo = {
			'conditions' : {
				create : function(options) {
					return new conditionViewModel(options.data);
				}
			}
		};
		
		self.name = ko.observable("");
		self.currentHitPoints = ko.observable();
		self.maxHitPoints = ko.observable();
		self.currentInitiative = ko.observable();
		self.initiativeModifier = ko.observable();
		self.initiativeState = ko.observable("normal");
		self.isPlayerCharacter = ko.observable(false);
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
		
		self.conditionToAdd = ko.observable(new conditionViewModel());
		
		self.addCondition = function() {
			if (self.conditionToAdd().name() !== "" && self.conditionToAdd().roundsLeft() > 0) {
				self.conditions.push(self.conditionToAdd());
				self.conditionToAdd(new conditionViewModel());
			}
		};
		
		self.removeCondition = function(condition) {
			self.conditions.remove(condition);
		};
		
		ko.mapping.fromJS(data, extraMappingInfo, self);
	};
	
	var conditionViewModel = function (data) {
		var self = this;
		
		self.name = ko.observable("");
		self.roundsLeft = ko.observable(1);
		
		self.roundsLeftIndication = ko.computed(function() {
			return '(' + self.roundsLeft() + '↺)';
		}, self);
		
		ko.mapping.fromJS(data, {}, self);
	};
		

	function getModelData() {
		// TODO This function should get data from a server, storage, or whatever (as opposed to hard-coding it :D)
		var model = {
			combat : {	
				characters : [
					{ 	name : 'Mialee',
						isPlayerCharacter : true,
						currentHitPoints : 106,
						maxHitPoints : 106,
						currentInitiative : 12,
						initiativeModifier : 3,
						initiativeState : 'normal',
						conditions : [
							{ name : 'haste', roundsLeft : 16 }
						]
					},
					{	name : 'Jozan',
						isPlayerCharacter : true,
						currentHitPoints : 24,
						maxHitPoints : 89,
						currentInitiative : 16,
						initiativeModifier : 1,
						initiativeState : 'normal',
						conditions : [
							{ name : 'frightened', roundsLeft : 2 },
							{ name : 'dazed', roundsLeft : 1 }
						]
					},
					{ 	name : 'Krusk',
						isPlayerCharacter : true,
						currentHitPoints : 66,
						maxHitPoints : 165,
						currentInitiative : 21,
						initiativeModifier : 2,
						initiativeState : 'normal',
					},
					{ 	name : 'Orc 3',
						isPlayerCharacter : false,
						currentHitPoints : -9,
						currentInitiative : 12,
						initiativeModifier : 0,
						initiativeState : 'normal',
					},
					{ 	name : 'Tordek',
						isPlayerCharacter : true,
						currentHitPoints : 82,
						maxHitPoints : 82,
						currentInitiative : -1,
						initiativeModifier : -2,
						initiativeState : 'normal',
						conditions : [
							{ name : 'frightened', roundsLeft : 1 }
						]
					},
					{ 	name : 'Ancient red dragon',
						isPlayerCharacter : false,
						currentHitPoints : -25,
						currentInitiative : 12,
						initiativeModifier : 1,
						initiativeState : 'normal',
						conditions : [
							{ name : 'slowed', roundsLeft : 0 }
						]
					}
				],
				currentRound : 1,
				activeCharacterName : 'Mialee'
			},
			isInSetupMode : true,
			isInInitiativeMode : true,
			isInDmMode : false,
			isInDebugMode : true
		};
		return model;
	}

	
	function animateCurrentRound() {
		$('#current-round')
			.css('opacity', '0.2')
			.animate({ opacity: '1.0' }, 500)
			.animate({ opacity: '0.2' }, 500)
			.animate({ opacity: '1.0' }, 500)
			.animate({ opacity: '0.2' }, 500)
			.animate({ opacity: '1.0' }, 500);
	}
	
	var methods = {
		init : function () {
			var model = getModelData();
			var extraMappingInfo = {
				'combat' : {
					create : function(options) {
						return new combatViewModel(options.data);
					}
				}
			};
			viewModel = ko.mapping.fromJS(model, extraMappingInfo);
			ko.applyBindings(viewModel);
		},
		
	};
	
	$.fn.battleTop = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.battleTop' );
		}  
	};
	
})( jQuery );




