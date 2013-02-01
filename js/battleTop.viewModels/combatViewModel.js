var battleTop = (function (my) {
	my.viewModels = my.viewModels || {};
	
	my.viewModels.combatViewModel = function (data) {
		var self = this;
		var extraMappingInfo = {
			'characters' : {
				create : function(options) {
					return new my.viewModels.characterViewModel(options.data);
				}
			}
		};
		
		self.availableCharacterTypes = ko.observableArray(['PC', 'Ally-NPC', 'Hostile-NPC', 'Environment']);
		
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
		
		self.characterToAdd = ko.observable(new my.viewModels.characterViewModel());
		
		self.addCharacter = function() {
			if (self.characterToAdd().name() !== "") {
				if (self.characterToAdd().initiativeModifier() === undefined) {
					self.characterToAdd().initiativeModifier(0);
				}
				if (self.characterToAdd().currentInitiative() === undefined) {
					// TODO: "RollInitiative" should be a method on the character view model
					self.characterToAdd().currentInitiative(my.util.dice.rollDice(20));
				}
				self.characters.push(self.characterToAdd());
				self.characterToAdd(new my.viewModels.characterViewModel());
			}
		};
		
		ko.mapping.fromJS(data, extraMappingInfo, self);
		self.initiativeSort();
	};
	
	return my;
}(battleTop || {}));