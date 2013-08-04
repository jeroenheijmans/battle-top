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
    

})();