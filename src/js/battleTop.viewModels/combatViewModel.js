var battleTop = (function (my) {
	"use strict";
	
	my.viewModels = my.viewModels || {};
	
	my.viewModels.combatViewModel = function (data) {
		var self = this;
		var extraMappingInfo = {
			'characters' : {
				key : function(data) {
					return ko.utils.unwrapObservable(data.id);
				},
				create : function(options) {
					return new my.viewModels.characterViewModel(options.data, self);
				}
			}
		};
		
		var defaults = { 
            activeCharacterId: null, 
            characters: [],
            currentRound: 1,
            nextIdSeed: 1
        };
        
        data = $.extend({}, defaults, data);
		
		ko.mapping.fromJS(data, extraMappingInfo, self);
		
		self.roundStartDateTime = ko.observable(new Date());
		
		self.elapsedInTurn = ko.computed(function() {
			var secondsElapsed = parseInt((new Date().getTime() / 1000) - (self.roundStartDateTime().getTime() / 1000), 10);
			var hours = Math.floor(secondsElapsed / 3600);
			var mins = Math.floor((secondsElapsed - (hours * 3600)) / 60);
			var secs = secondsElapsed % 60;
			return (new Date(1,1,1,hours,mins,secs)).getFormattedTime();
		});
				
		self.availableCharacterTypes = ko.observableArray(['PC', 'Ally-NPC', 'Hostile-NPC', 'Environment']);
		
		self.isExpanded = ko.observable(false);
		
		self.toggleExpandedState = function() {
			self.isExpanded(!self.isExpanded());
			self.characters().forEach(function (character) { character.isExpanded(self.isExpanded()); });
		};
		
		self.activeCharacter = ko.computed(function() {
			var activeCharacters = self.characters().filter(function(item) { return item.id() === self.activeCharacterId(); });
			if (activeCharacters.length === 1) {
				return activeCharacters[0];
			}
			return undefined;
		});
		
		self.activeCharacterName = ko.computed(function() {
			var character = self.activeCharacter();
			return character ? character.name() : "no-one";
		});
		
		self.nextCharacter = ko.computed(function() {
			// TODO: Refactor this ugly, ugly bit of code:
			var characters = self.characters();
			var nextCharacter = null;
			var currentCharacterIndex = -1;
			for (var i = 0; i <  characters.length; i++) {
				if (self.activeCharacter() && characters[i].id() === self.activeCharacter().id()) {
					currentCharacterIndex = i;
				}
			}
			
			if (currentCharacterIndex === -1 || currentCharacterIndex === characters.length-1) {
				nextCharacter = characters[0];
			}
			else {
				nextCharacter = characters[currentCharacterIndex+1];
			}
			return nextCharacter;
		});
		
		self.initiativeSort = function () {
			self.characters.sort(function(a,b) { 
				return b.currentInitiative() === a.currentInitiative() ?
						b.initiativeModifier() - a.initiativeModifier() :
						b.currentInitiative() - a.currentInitiative();
			});
		};

		self.nextRound = function() {
			self.currentRound(self.currentRound() + 1);
		};
		
		self.nextTurn = function() {
			var nextCharacter = self.nextCharacter();
			self.activeCharacter().endTurn();
			if (nextCharacter.id() === self.characters()[0].id()) {
				self.nextRound();
			}
			self.activeCharacterId(nextCharacter.id());
			self.roundStartDateTime(new Date());
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
		
		self.activateInitiative = function(character) {
			self.characters.remove(character);
			var activeCharacterIndex = self.characters.indexOf(self.activeCharacter());
			
			var newIndex = self.characters.indexOf(character);
			
			if (character.initiativeState() === 'readied') {
				newIndex = activeCharacterIndex;
			}
			
			if (character.initiativeState() === 'delayed') {
				newIndex = activeCharacterIndex + 1;
			}
			
			self.characters.splice(newIndex, 0, character);
			character.initiativeState('normal');
			character.currentInitiative(self.activeCharacter().currentInitiative());
		};
		
		self.removeCharacter = function(character) {
			if (character === self.activeCharacter()) {
				self.nextTurn();
			}
			self.characters.remove(character);
		};
		
		self.characterToAdd = ko.observable(new my.viewModels.characterViewModel(null, self));
		
		function generateNextCharacterId() {
			var seed = self.nextIdSeed();
			self.nextIdSeed(seed + 1);
			return seed;
		}
		
		self.addCharacter = function() {
			if (!self.characterToAdd().initiativeModifier()) {
				self.characterToAdd().initiativeModifier(0);
			}
			
			if (self.characterToAdd().name() !== "" && /^-?[\d]+$/.test(self.characterToAdd().initiativeModifier())) {		
				if (!self.characterToAdd().currentInitiative()) {
					// TODO: "RollInitiative" should be a method on the character view model
					self.characterToAdd().currentInitiative(my.util.dice.rollDice(20) + parseInt(self.characterToAdd().initiativeModifier(), 10));
				}
				
				self.characterToAdd().id(generateNextCharacterId());
				self.characters.push(self.characterToAdd());
				self.initiativeSort();
				self.characterToAdd(new my.viewModels.characterViewModel(null, self));
			}
		};
		
		self.resetToParty = function () {
			self.characters.remove(function (character) {
				return !character.isPlayerCharacter();
			});
			self.currentRound(1);
			self.activeCharacterId(self.characters()[0].id());
		};
		
		self.resetToBasic = function() {
			self.characters.removeAll();
			var newPlayer = new my.viewModels.characterViewModel({ name: 'Player 1', initiativeModifier: 10, currentInitiative: 10, currentHitPoints: 10, maxHitPoints: 10 }, self);
			self.characters.push(newPlayer);
			self.activeCharacterId(newPlayer.id());
		};
		
		self.initiativeSort();
	};
	
	return my;
}(battleTop || {}));