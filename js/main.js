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
		alert('Demo-version only. Ready still needs to be tweaked (not lost on next-round, option to "activate" the ready, etc)');
	});
	
	$('#initiative-delay').on('click', function() {
		$('#initiative table tbody .current-player').addClass('delayed');
		endCurrentTurn();
		alert('Demo-version only. Delay still needs to be tweaked (not lost on next-round, option to "activate" the delay, etc)');
	});	
	
	$(document).on('click', '.collapse-expand-row', function() {
		$(this).closest('tr').toggleClass('expanded');
	});
	
	$('#current-round').on('click', function() {
		var roundNumber = prompt('Specify round number');
		if (!isNaN(parseFloat(roundNumber)) && isFinite(roundNumber))
			$().battleTop('setSpecificRound', roundNumber);
		else
			alert('You didn\'t specifiy a number, silly!');
	});
	
	$('#reset, ul#edit-mode li').on('click', function() {
		alert('Not available yet');
	});
	
})( jQuery );