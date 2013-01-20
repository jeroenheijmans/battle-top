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
	var viewModel = {};
	
	var battleTopViewModel = function (data) {
		var self = this;
		ko.mapping.fromJS(data, {}, self);
		
		// Augment view model:
		// TODO
	};
	
	var combatViewModel = function (data) {
		var self = this;
		ko.mapping.fromJS(data, {}, self);
		
		// Augment view model:
		// TODO
	};
	
	var characterViewModel = function (data) {
		var self = this;
		var extraMappingInfo = {
			'conditions' : {
				create : function(options) {
					return new conditionViewModel(options.data);
				}
			}
		};
		ko.mapping.fromJS(data, extraMappingInfo, self);
		
		self.initiativeModifierAsAside = ko.computed(function() {
			var plusOrMinus = self.initiativeModifier >= 0 ? '+' : '';
			return '(' + plusOrMinus + self.initiativeModifier() + ')';
		}, self);
		
		self.hitPoints = ko.computed(function() {
			return self.currentHitPoints() + (!self.maxHitPoints() || '/' + self.maxHitPoints());
		}, self);
	};
	
	var conditionViewModel = function (data) {
		var self = this;
		ko.mapping.fromJS(data, {}, self);
		
		self.roundsLeftIndication = ko.computed(function() {
			return '(' + self.roundsLeft() + '↺)';
		}, self);
	};
		

	function getModelData() {
		// TODO This function should get data from a server, storage, or whatever (as opposed to hard-coding it :D)
		var model = {
			combat : {	
				characters : [
					{ 	name : 'Skaak',
						isPlayerCharacter : true,
						currentHitPoints : 106,
						maxHitPoints : 106,
						currentInitiative : 12,
						initiativeModifier : 5,
						initiativeState : 'normal',
						conditions : [
							{ name : 'haste', roundsLeft : 16 }
						]
					},
					{	name : 'Elcade',
						isPlayerCharacter : true,
						currentHitPoints : 24,
						maxHitPoints : 89,
						currentInitiative : 21,
						initiativeModifier : 6,
						initiativeState : 'delayed',
						conditions : [
							{ name : 'frightened', roundsLeft : 2 },
							{ name : 'dazed', roundsLeft : 1 }
						]
					},
					{ 	name : 'Oscar',
						isPlayerCharacter : true,
						currentHitPoints : 66,
						maxHitPoints : 105,
						currentInitiative : 21,
						initiativeModifier : 4,
						initiativeState : 'normal',
						conditions : []
					},
					{ 	name : 'Orc 3',
						isPlayerCharacter : false,
						currentHitPoints : -9,
						maxHitPoints : undefined,
						currentInitiative : 12,
						initiativeModifier : 0,
						initiativeState : 'normal',
						conditions : []
					},
					{ 	name : 'Kagor',
						isPlayerCharacter : true,
						currentHitPoints : 82,
						maxHitPoints : 82,
						currentInitiative : -1,
						initiativeModifier : -2,
						initiativeState : 'readied',
						conditions : [
							{ name : 'frightened', roundsLeft : 1 }
						]
					},
					{ 	name : 'Ancient red dragon',
						isPlayerCharacter : false,
						currentHitPoints : -25,
						maxHitPoints : undefined,
						currentInitiative : 12,
						initiativeModifier : 1,
						initiativeState : 'normal',
						conditions : [
							{ name : 'slowed', roundsLeft : 0 }
						]
					}
				],
				currentRound : 1,
				activeCharacter : 'Skaak'
			},
			isInSetupMode : false,
			isInInitiativeMode : true,
			isInDmMode : false,
			isInDebugMode : true
		};
		return model;
	}
	
	function animateCurrentRound() {
		$('#current-round')
			.css('opacity', '0.2')
			.animate({ opacity: '1.0' }, 500)
			.animate({ opacity: '0.2' }, 500)
			.animate({ opacity: '1.0' }, 500)
			.animate({ opacity: '0.2' }, 500)
			.animate({ opacity: '1.0' }, 500);
	}
	
	function endTurnForCurrentCharacter() {
		var current = $('#initiative table tbody .current-player');
		var data = ko.dataFor(current[0]);
		
		var conditions = data.conditions();
		
		for (i = conditions.length-1; i >= 0; i--) {
			conditions[i].roundsLeft(conditions[i].roundsLeft() - 1);
		}		
	}
	
	function activateNextCharacter() {
		var next = $('#initiative table tbody .current-player').next('tr');
		
		if (next.size() === 0) {
			next = $('#initiative table tbody tr:first');
			methods.nextRound();
		}
				
		viewModel.combat.activeCharacter(ko.dataFor(next[0]).name());
	}
	
	function prepareTurnForCurrentCharacter() {
		var data = ko.dataFor($('#initiative table tbody .current-player')[0]);
		data.initiativeState('normal');
		
		data.conditions.remove(function(item) { return item.roundsLeft() <= 0; });
	}
	
	var methods = {
		init : function () {
			var model = getModelData();
			var extraMappingInfo = {
				'characters' : {
					create : function(options) {
						return new characterViewModel(options.data);
					}
				}
			};
			viewModel = ko.mapping.fromJS(model, extraMappingInfo);
			methods.initiativeSort();
			ko.applyBindings(viewModel);
		},
		
		initiativeSort : function () {
			viewModel.combat.characters.sort(function(a,b) { 
				return b.currentInitiative() == a.currentInitiative() ?
						b.initiativeModifier() - a.initiativeModifier() :
						b.currentInitiative() - a.currentInitiative();
			});
		},
		
		nextRound : function () {
			viewModel.combat.currentRound(viewModel.combat.currentRound() + 1);
			animateCurrentRound();
		},
		
		nextTurn : function () {
			endTurnForCurrentCharacter();
			activateNextCharacter();
			prepareTurnForCurrentCharacter();
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




