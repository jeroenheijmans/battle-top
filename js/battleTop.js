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
	
	$(document).on('click', '.readonly-pane', function() {
		$(this).addClass('hidden');
		$(this).siblings('.edit-pane').removeClass('hidden');
	});	
	
	$(document).on('click', '.edit-pane .finish-editing', function() {
		$(this).parent('.edit-pane').addClass('hidden');
		$(this).parent('.edit-pane').siblings('.readonly-pane').removeClass('hidden');
	});
	
	$(document).ready(function () {
		var model = battleTop.data.getModelData();
		var viewModel = ko.mapping.fromJS(model, {}, new battleTop.viewModels.battleTopViewModel());
		ko.applyBindings(viewModel);
	});
	
})( jQuery );