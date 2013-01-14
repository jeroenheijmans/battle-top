(function( $ ) {
	$('#initiative-next').on('click', function() {
		var current = $('#initiative table tbody .active');
		var next = current.next('tr');
		
		if (next.size() === 0) {
			next = $('#initiative table tbody tr:first');
			$().battleTop('nextRound');
		}
		
		next.addClass('active').addClass('expanded').find('.collapse-expand-row');
		current.removeClass('active').removeClass('expanded').find('.collapse-expand-row');
	});
	
	$(document).on('click', '.collapse-expand-row', function() {
		$(this).closest('tr').toggleClass('expanded');
	});
})( jQuery );