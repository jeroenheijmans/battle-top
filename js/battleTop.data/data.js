﻿var battleTop = (function (my) {
	my.data = my.data || {};
	
	my.data.getModelData = function() {
		// TODO This function should get data from a server, storage, or whatever (as opposed to hard-coding it :D)
		var model = {
			combat : {	
				characters : [
					{ 	id : 1,
						name : 'Mialee',
						characterType : 'PC',
						currentHitPoints : 106,
						maxHitPoints : 106,
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
						maxHitPoints : 89,
						currentInitiative : 16,
						initiativeModifier : 1,
						initiativeState : 'normal',
						conditions : [
							{ name : 'frightened', roundsLeft : 2 },
							{ name : 'dazed', roundsLeft : 1 }
						]
					},
					{ 	id : 3,
						name : 'Krusk',
						characterType : 'PC',
						currentHitPoints : 66,
						maxHitPoints : 165,
						currentInitiative : 21,
						initiativeModifier : 2,
						initiativeState : 'normal',
					},
					{ 	id : 4,
						name : 'Orc 3',
						characterType : 'Hostile-NPC',
						currentHitPoints : -9,
						currentInitiative : 12,
						initiativeModifier : 0,
						initiativeState : 'normal',
					},
					{ 	id : 5,
						name : 'Tordek',
						characterType : 'PC',
						currentHitPoints : 82,
						maxHitPoints : 82,
						currentInitiative : -1,
						initiativeModifier : -2,
						initiativeState : 'normal',
						conditions : [
							{ name : 'frightened', roundsLeft : 1 }
						]
					},
					{ 	id : 6,
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
	}
	
	return my;
}(battleTop || {}));