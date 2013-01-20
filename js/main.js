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
		
	$(document).on('click', '.readonly-pane', function() {
		$(this).addClass('hidden');
		$(this).siblings('.edit-pane').removeClass('hidden');
	});	
	
	$(document).on('click', '.edit-pane .finish-editing', function() {
		$(this).parent('.edit-pane').addClass('hidden');
		$(this).parent('.edit-pane').siblings('.readonly-pane').removeClass('hidden');
	});
	
})( jQuery );

$(document).ready(function() {
	$('#main').battleTop();
});