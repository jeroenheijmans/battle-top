// Avoid `console` errors in browsers that lack a console.
(function() {
	"use strict";

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
	"use strict";
	
	$(document).on('click', '.readonly-pane', function() {
		$(this).addClass('hidden');
		$(this).siblings('.edit-pane').removeClass('hidden');
	});
	
	var finishEditing = function(region) {
		$(region).parent('.edit-pane').addClass('hidden');
		$(region).parent('.edit-pane').siblings('.readonly-pane').removeClass('hidden');
	};
	
	$(document).on('click', '.edit-pane .finish-editing', function() { finishEditing(this); });
	
	$(document).on('keypress', '.edit-pane input', function(e) {
		if (e.which === 13) {
			finishEditing(this);
		}
	});
	
	$(document).ready(function () {
		var model = battleTop.data.getModelData();
		var viewModel = ko.mapping.fromJS(model, {}, new battleTop.viewModels.battleTopViewModel());
		ko.applyBindings(viewModel);
		
		// Cannot force an update on the "computed" elapsedInTurn directly, so forcing update on the observable it depends upon:
		setInterval(function() { viewModel.combat.roundStartDateTime.valueHasMutated(); }, 1000);
		
		// TODO: Integrate this hack with the KnockoutDirtyFlag feature branch (save upon the VM getting dirty)
		setInterval(function() { battleTop.data.saveModelData(viewModel); }, 5000);
	});
	
})( jQuery );