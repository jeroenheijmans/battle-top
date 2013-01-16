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
		
	function animateCurrentRound(roundNumber) {
		$('#current-round')
			.css('opacity', '0.2')
			.animate({ opacity: '1.0' }, 500)
			.animate({ opacity: '0.2' }, 500)
			.animate({ opacity: '1.0' }, 500)
			.animate({ opacity: '0.2' }, 500)
			.animate({ opacity: '1.0' }, 500);
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
		},
		
		nextRound : function () {
			$('#current-round-field').val(parseInt($('#current-round-field').val()) + 1).change();
			model.combat.currentRound++; // TODO combine with Knockout
			model.combat.characters.forEach(decrementConditionDurations); // TODO combine with Knockout
			animateCurrentRound(model.combat.currentRound);
		},
		
		setSpecificRound : function (roundNumber) {
			model.combat.currentRound = roundNumber; // TODO combine with Knockout
			animateCurrentRound(roundNumber);
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




