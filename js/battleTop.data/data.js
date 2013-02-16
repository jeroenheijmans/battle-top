var battleTop = (function (my) {
	"use strict";
	
	my.data = my.data || {};
	
	var localStorageViewModelKey = "battleTopViewModel";
	
	my.data.saveModelData = function(viewModel) {
		$("#saving-indicator").fadeIn(750);
		
		// TODO: New instances of viewModels (extra characters, conditions, etc) aren't saved correctly.
		var json = ko.mapping.toJSON(viewModel);
		localStorage.setItem(localStorageViewModelKey, json);
		
		$("#saving-indicator").fadeOut(2000);
	};
	
	
	my.data.getModelData = function() {
		var storageItem = localStorage.getItem(localStorageViewModelKey);
		
		// Check for NULL, defeat Android bug 11973 (http://code.google.com/p/android/issues/detail?id=11973)
		var model = null;
		if (storageItem !== null) {
			model = JSON.parse(storageItem);
		}
			
		if (model) {
			return model;
		}
	
		// TODO This function should get data from a server, storage, or whatever (as opposed to hard-coding it :D)
		model = {
			combat : {	
				characters : [
					{	id : 1,
						name : 'Mialee',
						characterType : 'PC',
						currentHitPoints : 106,
						currentInitiative : 12,
						initiativeModifier : 3,
						initiativeState : 'normal',
						conditions : [
							{ name : 'haste', roundsLeft : 16 }
						]
					},
					{	id : 2,
						name : 'Jozan',
						characterType : 'PC',
						currentHitPoints : 24,
						currentInitiative : 16,
						initiativeModifier : 1,
						initiativeState : 'normal',
						conditions : [
							{ name : 'frightened', roundsLeft : 2 },
							{ name : 'dazed', roundsLeft : 1 }
						]
					},
					{	id : 3,
						name : 'Krusk',
						characterType : 'PC',
						currentHitPoints : 66,
						currentInitiative : 21,
						initiativeModifier : 2,
						initiativeState : 'normal'
					},
					{	id : 4,
						name : 'Orc 3',
						characterType : 'Hostile-NPC',
						currentHitPoints : -9,
						currentInitiative : 12,
						initiativeModifier : 0,
						initiativeState : 'normal'
					},
					{	id : 5,
						name : 'Tordek',
						characterType : 'PC',
						currentHitPoints : 82,
						currentInitiative : -1,
						initiativeModifier : -2,
						initiativeState : 'normal',
						conditions : [
							{ name : 'frightened', roundsLeft : 1 }
						]
					},
					{	id : 6,
						name : 'Ancient red dragon',
						characterType : 'Hostile-NPC',
						currentHitPoints : -25,
						currentInitiative : 12,
						initiativeModifier : 1,
						initiativeState : 'normal',
						conditions : [
							{ name : 'slowed', roundsLeft : 1 }
						]
					}
				],
				currentRound : 1,
				activeCharacterId : 3,
				nextIdSeed : 7
			},
			isInSetupMode : true,
			showAboutInfo : false
		};
		return model;
	};
	
	return my;
}(battleTop || {}));