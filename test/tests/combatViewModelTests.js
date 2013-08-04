module("Combat View Model");


test( "Can construct default view model", function() {
    var viewModel = new battleTop.viewModels.combatViewModel();
    notDeepEqual(viewModel, null);
});


test( "Can toggle own expanded state", function() {
    var viewModel = new battleTop.viewModels.combatViewModel();
    
    ok(!viewModel.isExpanded());
    
    viewModel.toggleExpandedState();
    
    deepEqual(viewModel.isExpanded(), true);
});


test( "Toggling expanded to true will expand all characters", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({
        characters: [{}, {}]
    });
    
    viewModel.characters()[1].isExpanded(true);
    viewModel.toggleExpandedState();
    
    deepEqual(viewModel.characters()[0].isExpanded(), true);
    deepEqual(viewModel.characters()[1].isExpanded(), true);
});


test( "Toggling expanded to false will collapse all characters", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({
        characters: [{}, {}]
    });
    
    viewModel.isExpanded(true);
    viewModel.characters()[1].isExpanded(true);
    viewModel.toggleExpandedState();
    
    deepEqual(viewModel.characters()[0].isExpanded(), false);
    deepEqual(viewModel.characters()[1].isExpanded(), false);
});


test( "ActiveCharacter will be based on the ActiveCharacterId", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({
        activeCharacterId: 2,
        characters: [{name:'Mialee', id:1}, {name: 'Krusk', id:2}]
    });
    
    deepEqual(viewModel.activeCharacter().name(), 'Krusk');
});


test( "Can find next character out of two available", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({
        activeCharacterId: 1,
        characters: [{name:'Mialee', id:1}, {name: 'Krusk', id:2}]
    });

    deepEqual(viewModel.nextCharacter().name(), 'Krusk');
});


test( "Next turn is for top-initiative if it's last character's turn", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({
        activeCharacterId: 2,
        characters: [{name:'Mialee', id:1}, {name: 'Krusk', id:2}]
    });

    deepEqual(viewModel.nextCharacter().name(), 'Mialee');
});


test( "Starts sorted by initiative", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({
        characters: [{currentInitiative: 15}, {currentInitiative: 5}, {currentInitiative: 10}]
    });

    deepEqual(viewModel.characters()[0].currentInitiative(), 15);
    deepEqual(viewModel.characters()[1].currentInitiative(), 10);
    deepEqual(viewModel.characters()[2].currentInitiative(), 5);
});


test( "Can sort by initiative on demand", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({
        characters: []
    });
    
    viewModel.characters.push(new battleTop.viewModels.characterViewModel({currentInitiative: 5}, viewModel));
    viewModel.characters.push(new battleTop.viewModels.characterViewModel({currentInitiative: 10}, viewModel));
    viewModel.characters.push(new battleTop.viewModels.characterViewModel({currentInitiative: 15}, viewModel));
    
    viewModel.initiativeSort();

    deepEqual(viewModel.characters()[0].currentInitiative(), 15);
    deepEqual(viewModel.characters()[1].currentInitiative(), 10);
    deepEqual(viewModel.characters()[2].currentInitiative(), 5);
});


test( "Can go to next round", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({currentRound: 3});
    
    viewModel.nextRound();
    
    deepEqual(viewModel.currentRound(), 4);
});


test( "Next turn will activate next character", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({
        activeCharacterId: 1,
        characters: [{name:'Mialee', id:1}, {name: 'Krusk', id:2}]
    });

    viewModel.nextTurn();
    
    deepEqual(viewModel.activeCharacter().name(), 'Krusk');
});


test( "Next turn will wrap around to first character on end of round", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({
        activeCharacterId: 2,
        characters: [{name:'Mialee', id:1}, {name: 'Krusk', id:2}]
    });

    var firstRoundStart = viewModel.roundStartDateTime();
    
    viewModel.nextTurn();
    
    deepEqual(viewModel.activeCharacter().name(), 'Mialee');
    deepEqual(viewModel.currentRound(), 2);
});


test( "Can choose delay action for current character", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({
        activeCharacterId: 1,
        characters: [{name:'Mialee', id:1}, {name: 'Krusk', id:2}]
    });
    
    viewModel.delayTurn();
    
    deepEqual(viewModel.characters()[0].initiativeState(), 'delayed');
    deepEqual(viewModel.activeCharacterId(), 2);
});


test( "Can choose ready action for current character", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({
        activeCharacterId: 1,
        characters: [{name:'Mialee', id:1}, {name: 'Krusk', id:2}]
    });
    
    viewModel.readyTurn();
    
    deepEqual(viewModel.characters()[0].initiativeState(), 'readied');
    deepEqual(viewModel.activeCharacterId(), 2);
});


test( "Activating readied character will move character initiative directly above active character", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({
        activeCharacterId: 1,
        characters: [{name:'Mialee', id:1}, 
                     {name: 'Jozan', id:2},
                     {name: 'Krusk', id:3, initiativeState: 'readied'}]
    });
    
    var krusk = viewModel.characters()[2];
    
    viewModel.activateInitiative(krusk);
    
    deepEqual(viewModel.characters()[0].id(), krusk.id());
    deepEqual(krusk.initiativeState(), 'normal');
});


test( "Activating delayed character will move character initiative directly blow active character", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({
        activeCharacterId: 1,
        characters: [{name:'Mialee', id:1}, 
                     {name: 'Jozan', id:2},
                     {name: 'Krusk', id:3, initiativeState: 'delayed'}]
    });
    
    var krusk = viewModel.characters()[2];
    
    viewModel.activateInitiative(krusk);
    
    deepEqual(viewModel.characters()[1].id(), krusk.id());
    deepEqual(krusk.initiativeState(), 'normal');
});


test( "Can remove character", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({ characters: [{}, {}] });
    viewModel.removeCharacter(viewModel.characters()[0]);
    deepEqual(viewModel.characters().length, 1);
});


test( "Removing character activates next one", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({ 
        activeCharacterId: 1,
        characters: [{name:'Mialee', id:1}, {name: 'Krusk', id:2}]
    });
    
    viewModel.removeCharacter(viewModel.characters()[0]);
    
    deepEqual(viewModel.activeCharacterId(), 2);
});


test( "Can add new character", function() {
    var viewModel = new battleTop.viewModels.combatViewModel();
    viewModel.characterToAdd().name('Lidda');
    viewModel.characterToAdd().currentInitiative(10);
    
    viewModel.addCharacter();
    
    deepEqual(viewModel.characters().length, 1);
});


test( "Reset to party will discard monsters, npc's and environment factors, keeping players", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({
        characters: [{characterType: 'PC', name:'Mialee'}, 
                     {characterType: 'PC', name:'Krusk'}, 
                     {characterType: 'Ally-NPC'}, 
                     {characterType: 'Hostile-NPC'}, 
                     {characterType: 'Environment'}]
    });
    
    viewModel.resetToParty();
    
    deepEqual(viewModel.characters().length, 2);
    deepEqual(viewModel.characters()[0].name(), 'Mialee');
    deepEqual(viewModel.characters()[1].name(), 'Krusk');
});

test( "Reset to party will remove conditions", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({
        characters: [{characterType: 'PC', 
                      name:'Mialee', 
                      conditions: [{}]
                    }]
    });
    
    viewModel.resetToParty();
    
    deepEqual(viewModel.characters()[0].conditions().length, 0);
});


test( "Reset to basic will go back to just 1 player character", function() {
    var viewModel = new battleTop.viewModels.combatViewModel({
        characters: [{characterType: 'PC', name:'Mialee'}, 
                     {characterType: 'PC', name:'Krusk'}, 
                     {characterType: 'Ally-NPC'}, 
                     {characterType: 'Hostile-NPC'}, 
                     {characterType: 'Environment'}]
    });
    
    viewModel.resetToBasic();

    deepEqual(viewModel.characters().length, 1);
    deepEqual(viewModel.characters()[0].id(), viewModel.activeCharacterId());
});