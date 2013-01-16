(function( $ ) {
	$('#initiative-next').on('click', function() {
		$().battleTop('nextTurn');
	});
	
	$('#initiative-ready').on('click', function() {
		ko.dataFor($('#initiative table tbody .current-player')[0]).initiativeState('readied');
		$().battleTop('nextTurn');
	});
	
	$('#initiative-delay').on('click', function() {
		ko.dataFor($('#initiative table tbody .current-player')[0]).initiativeState('delayed');
		$().battleTop('nextTurn');
	});	
	
	$(document).on('click', '.collapse-expand-row', function() {
		$(this).closest('tr').toggleClass('expanded');
	});
})( jQuery );

$(document).ready(function() {
	$('#main').battleTop();
});