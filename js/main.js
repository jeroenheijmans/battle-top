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
	
	$(document).on('click', '.hp-readonly', function() {
		$(this).addClass('hidden');
		$(this).siblings('.hp-edit').removeClass('hidden');
	});	
	
	$(document).on('click', '.hp-edit .finish-editing', function() {
		$(this).parent('.hp-edit').addClass('hidden');
		$(this).parent('.hp-edit').siblings('.hp-readonly').removeClass('hidden');
	});
	
})( jQuery );

$(document).ready(function() {
	$('#main').battleTop();
});