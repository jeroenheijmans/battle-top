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
					initiativeState : 'normal',
					conditions : [
						{ name : 'haste', roundsLeft : 16 }
					]
				},
				{	name : 'Elcade',
					currentHitPoints : 24,
					maxHitPoints : 89,
					currentInitiative : 21,
					initiativeModifier : 6,
					initiativeState : 'delayed',
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
					initiativeState : 'normal',
					conditions : []
				},
				{ 	name : 'Orc 3',
					currentHitPoints : -9,
					maxHitPoints : undefined,
					currentInitiative : 21,
					initiativeModifier : 4,
					initiativeState : 'normal',
					conditions : []
				},
				{ 	name : 'Kagor',
					currentHitPoints : 82,
					maxHitPoints : 82,
					currentInitiative : -1,
					initiativeModifier : -2,
					initiativeState : 'readied',
					conditions : [
						{ name : 'frightened', roundsLeft : 1 }
					]
				},
				{ 	name : 'Ancient red dragon',
					currentHitPoints : -25,
					maxHitPoints : undefined,
					currentInitiative : 12,
					initiativeModifier : 1,
					initiativeState : 'normal',
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
	model.combat.characters.sort(function(a,b) { return b.currentInitiative - a.currentInitiative; });
	var viewModel = ko.mapping.fromJS(model);
	
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
			ko.applyBindings(viewModel);
		},
		
		nextRound : function () {
			viewModel.combat.currentRound(viewModel.combat.currentRound() + 1);
			animateCurrentRound();
		},
		
		nextTurn : function () {
			var next = $('#initiative table tbody .current-player').next('tr');
			
			if (next.size() === 0) {
				next = $('#initiative table tbody tr:first');
				methods.nextRound();
			}
			
			var nextData = ko.dataFor(next[0]);
			if (nextData.initiativeState() == 'delayed') nextData.initiativeState('normal');
			
			viewModel.combat.activeCharacter(nextData.name());
		}
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




