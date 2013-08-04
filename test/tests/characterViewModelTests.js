(function() {

    var combat = null;

    module("Character View Model", {
        setup: function() {
            // Mock the combat object
            combat = {
                activeCharacter: ko.observable(null)
            };
            combat.activeCharacter(new battleTop.viewModels.characterViewModel({name: 'Mialee'}, combat));
        }
    });


    test( "Can construct default character view model", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({}, combat);
        
        deepEqual(viewModel.id(), 0);
        deepEqual(viewModel.characterType(), "PC");
        deepEqual(viewModel.initiativeState(), "normal");
        deepEqual(viewModel.conditions().length, 0);
        ok(!viewModel.isExpanded());
    });
    
    
    test( "Can toggle expanded state to true", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({}, combat);
        viewModel.toggleExpandedState();
        ok(viewModel.isExpanded());
    });
    
    
    test( "Can become active character", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({}, combat);
        combat.activeCharacter(viewModel);
        ok(viewModel.isActive());
    });
    
    
    test( "Beginning turn resets initiative state", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({initiativeState: 'delayed'}, combat);
        viewModel.beginTurn();
        deepEqual(viewModel.initiativeState(), 'normal');
    });
    
    
    test( "Beginning turn lowers condition rounds left", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({}, combat);
        viewModel.conditions.push(new battleTop.viewModels.conditionViewModel({roundsLeft: 10}));
        viewModel.conditions.push(new battleTop.viewModels.conditionViewModel({roundsLeft: 1}));
        
        viewModel.beginTurn();
        deepEqual(viewModel.conditions().length, 2);
        deepEqual(viewModel.conditions()[0].roundsLeft(), 9);
        deepEqual(viewModel.conditions()[1].roundsLeft(), 0);
    });
    
    
    test( "Ending turn removes conditions with -1 rounds left", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({}, combat);
        viewModel.conditions.push(new battleTop.viewModels.conditionViewModel({roundsLeft: -1}));
        
        viewModel.endTurn();
        deepEqual(viewModel.conditions().length, 0);
    });
    
    
    test( "PC is considered player character", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({characterType: 'PC'}, combat);
        ok(viewModel.isPlayerCharacter());
    });
    
    
    test( "Monster is not considered player character", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({characterType: 'monster'}, combat);
        ok(!viewModel.isPlayerCharacter());
    });
    
    
    test( "Will format positive initiative modifier with plus sign", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({initiativeModifier: 4}, combat);
        deepEqual(viewModel.initiativeModifierAsAside(), '(+4)');     
    });
    
    
    test( "Will format negative initiative modifier with minus sign", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({initiativeModifier: -2}, combat);
        deepEqual(viewModel.initiativeModifierAsAside(), '(-2)');     
    });
    
    
    test( "Will format zero initiative modifier with plus sign", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({initiativeModifier: 0}, combat);
        deepEqual(viewModel.initiativeModifierAsAside(), '(+0)');     
    });
    
    
    test( "Will display empty string for undefined hit points", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({}, combat);
        deepEqual(viewModel.hitPoints(), '');
    });
    
    
    test( "Will set up a new condition to add", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({}, combat);
        notDeepEqual(viewModel.conditionToAdd(), undefined);
        notDeepEqual(viewModel.conditionToAdd(), null);
    });
    
    
    test( "Adding new condition will add to the list and reset the 'to add' condition", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({}, combat);
        
        viewModel.conditionToAdd().name("Dazed");
        viewModel.conditionToAdd().roundsLeft(1);
        viewModel.addCondition();
        
        deepEqual(viewModel.conditions().length, 1);
        notDeepEqual(viewModel.conditionToAdd(), undefined);
        notDeepEqual(viewModel.conditionToAdd(), null);
        notDeepEqual(viewModel.conditionToAdd().name(), viewModel.conditions()[0].name());
    });
    
    
    test( "Can remove a condition", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({}, combat);
        var condition = new battleTop.viewModels.conditionViewModel();
        
        viewModel.conditions.push(condition);
        deepEqual(viewModel.conditions().length, 1);
        
        viewModel.removeCondition(condition);
        deepEqual(viewModel.conditions().length, 0);
    });
    
    test( "Change Hit Points will update hit points with current change view model", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({currentHitPoints: 8}, combat);
        
        viewModel.hpChange().hpChangeAbsolute(2);
        viewModel.changeHitPoints();
        
        deepEqual(viewModel.currentHitPoints(), 6);
    });
    
    
    test( "Change Hit Points will reset current change view model", function() {
        var viewModel = new battleTop.viewModels.characterViewModel({currentHitPoints: 8}, combat);
        var defaultHpChange = viewModel.hpChange().hpChangeAbsolute();
        
        viewModel.hpChange().hpChangeAbsolute(2);
        viewModel.changeHitPoints();
        
        deepEqual(viewModel.hpChange().hpChangeAbsolute(), defaultHpChange);
    });
    

})();