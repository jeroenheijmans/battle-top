(function( $ ) {
	function endCurrentTurn() {
		var current = $('#initiative table tbody .current-player');
		var next = current.next('tr');
		
		if (next.size() === 0) {
			next = $('#initiative table tbody tr:first');
			$().battleTop('nextRound');
		}
		
		next.addClass('current-player').addClass('expanded').find('.collapse-expand-row');
		current.removeClass('current-player').removeClass('expanded').find('.collapse-expand-row');
	}

	$('#initiative-next').on('click', function() {
		endCurrentTurn();
	});
	
	$('#initiative-ready').on('click', function() {
		$('#initiative table tbody .current-player').addClass('readied');
		endCurrentTurn();
	});
	
	$('#initiative-delay').on('click', function() {
		$('#initiative table tbody .current-player').addClass('delayed');
		endCurrentTurn();
	});	
	
	$(document).on('click', '.collapse-expand-row', function() {
		$(this).closest('tr').toggleClass('expanded');
	});
		
})( jQuery );


// TODO: stub code (note: the remaining jQuery plugin code also depends on this global, currently
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
	isInDmMode : false
};

// TODO: stub code
model.combat.characters.sort(function(a,b) { return b.currentInitiative - a.currentInitiative; });
var viewModel = ko.mapping.fromJS(model);
ko.applyBindings(viewModel);