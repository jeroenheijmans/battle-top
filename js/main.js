(function( $ ) {
	$('#initiative-next').on('click', function() {
		$().battleTop('nextTurn');
	});
	
	$('#initiative-ready').on('click', function() {
		$('#initiative table tbody .current-player').addClass('readied');
		$().battleTop('nextTurn');
	});
	
	$('#initiative-delay').on('click', function() {
		$('#initiative table tbody .current-player').addClass('delayed');
		$().battleTop('nextTurn');
	});	
	
	$(document).on('click', '.collapse-expand-row', function() {
		$(this).closest('tr').toggleClass('expanded');
	});
})( jQuery );

$(document).ready(function() {
	// TODO: stub code
	// TODO: this is now completely auto-mapped, but perhaps the ViewModels (at least
	//       at a high level) should have some view logic?
	var model = {
		combat : {	
			characters : [
				{ 	name : 'Skaak',
					currentHitPoints : 106,
					maxHitPoints : 106,
					currentInitiative : 12,
					initiativeModifier : 5,
					conditions : [
						{ name : 'haste', roundsLeft : 16 }
					]
				},
				{	name : 'Elcade',
					currentHitPoints : 24,
					maxHitPoints : 89,
					currentInitiative : 21,
					initiativeModifier : 6,
					conditions : [
						{ name : 'frightened', roundsLeft : 2 },
						{ name : 'dazed', roundsLeft : 1 }
					]
				},
				{ 	name : 'Oscar',
					currentHitPoints : 66,
					maxHitPoints : 105,
					currentInitiative : 21,
					initiativeModifier : 4,
					conditions : []
				},
				{ 	name : 'Orc 3',
					currentHitPoints : -9,
					maxHitPoints : undefined,
					currentInitiative : 21,
					initiativeModifier : 4,
					conditions : []
				},
				{ 	name : 'Kagor',
					currentHitPoints : 82,
					maxHitPoints : 82,
					currentInitiative : -1,
					initiativeModifier : -2,
					conditions : [
						{ name : 'frightened', roundsLeft : 1 }
					]
				},
				{ 	name : 'Ancient red dragon',
					currentHitPoints : -25,
					maxHitPoints : undefined,
					currentInitiative : 12,
					initiativeModifier : 1,
					conditions : [
						{ name : 'slowed', roundsLeft : 8 }
					]
				}
			],
			currentRound : 1,
			activeCharacter : 'Skaak'
		},
		isInSetupMode : false,
		isInInitiativeMode : true,
		isInDmMode : false,
		isInDebugMode : true
	};

	// TODO: stub code
	model.combat.characters.sort(function(a,b) { return b.currentInitiative - a.currentInitiative; });
	var viewModel = ko.mapping.fromJS(model);
	ko.applyBindings(viewModel);
});