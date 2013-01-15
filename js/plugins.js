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
	
	var model = {
		combat : {	
			characters : [
				{ 	name : 'Skaak',
					currentHitPoints : 106,
					maxHitPoints : 106,
					currentInitiative : 22,
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
					maxHitPoints : '???',
					currentInitiative : 12,
					initiativeModifier : 1,
					conditions : [
						{ name : 'slowed', roundsLeft : 8 }
					]
				}
			],
			currentRound : 1
		},
		currentModes : ['initiative']
	};
	
	function setActiveModes(modes) {
		for (i = 0; i < modes.length; i++) {
			$('#' + modes[i] + '-mode').addClass('active');
			$('#' + modes[i] + '-mode-toggle').prop('checked', true);
		}
	}
	
	function setcurrentRound(roundNumber) {
		$('#initiative-current-round-number').text(roundNumber);
		$('#current-round')
			.css('opacity', '0.2')
			.animate({ opacity: '1.0' }, 500)
			.animate({ opacity: '0.2' }, 500)
			.animate({ opacity: '1.0' }, 500);
	}
	
	function rebuildInitiativeList(characters) {
		// TODO: Refactor to some fancy pattern like MVVM? Anyways, here goes rapid prototyping:
		
		$('#initiative table tbody').empty();
		
		characters.sort(function(a,b) { return b.currentInitiative - a.currentInitiative; });
	
		for (i = 0; i < characters.length; i++) {
			var conditions = characters[i].conditions.length > 0 ? $('<ul class="conditions">') : "";
			for (j = 0; j < characters[i].conditions.length; j++) {
				conditions.append($('<li>')
					.text(characters[i].conditions[j].name
							+ ', '
							+ characters[i].conditions[j].roundsLeft
							+ ' more round(s)'
						)
					);
			}
		
			$('#initiative tbody')
				.append(
					$('<tr>')
					.append(
						$('<td class="actions"><button class="collapse-expand-row"></button></td>')
						.after(
							$('<td class="character">')
							.text(characters[i].name)
							.append(conditions)
						)
						.after($('<td class="number hp">').text(characters[i].currentHitPoints))
						.after($('<td class="number initiative-total">').text(characters[i].currentInitiative))
						.after($('<td class="number initiative-modifier">').text(characters[i].initiativeModifier))
					)
				);
		}
		
		$('#initiative tbody tr:first').addClass('current-player').addClass('expanded');
		$('#initiative tbody tr:first .collapse-expand-row');
	}
	
	function decrementConditionDurations(character) {
		for (i = character.conditions.length - 1; i >= 0; i--) {
			character.conditions[i].roundsLeft--;
			if (character.conditions[i].roundsLeft < 0) {
				character.conditions.splice(i,1);
			}
		}				
	}
	
	var methods = {
		init : function () {
			setActiveModes(model.currentModes);
			setcurrentRound(model.combat.currentRound);
			rebuildInitiativeList(model.combat.characters);
		},
		
		nextRound : function () {
			model.combat.currentRound++;
			model.combat.characters.forEach(decrementConditionDurations);
			setcurrentRound(model.combat.currentRound);
			rebuildInitiativeList(model.combat.characters);
		},
		
		setSpecificRound : function (roundNumber) {
			model.combat.currentRound = roundNumber;
			setcurrentRound(roundNumber);
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