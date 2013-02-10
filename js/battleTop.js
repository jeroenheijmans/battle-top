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

	ko.changedFlag = function(root) {
		var result = function() {};
		var initialState = ko.observable(ko.toJSON(root));

		result.isChanged = ko.dependentObservable(function() {
			var changed = initialState() !== ko.toJSON(root);
			if (changed) result.reset();
			return changed;
		});

		result.reset = function() {
			initialState(ko.toJSON(root));
		};

		return result;
	};
	
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
		
		// TODO: Refactor this. Feels very hackish to define the flag
		// on the viewModel in *this* place (but it works for now and
		// allows me to focus on the autosave feature).
		// TODO: This is to eager, it seems to trigger when the turn
		// timer increases by one secons.
		viewModel.changedFlag = new ko.changedFlag(viewModel);
		viewModel.changedFlag.isChanged.subscribe(function(isChanged) {
			viewModel.isDirty(true);
		});
		
		ko.applyBindings(viewModel);
		
		// Cannot force an update on the "computed" elapsedInTurn directly, so forcing update on the observable it depends upon:
		setInterval(function() { viewModel.combat.roundStartDateTime.valueHasMutated() }, 1000);
	});
	
})( jQuery );