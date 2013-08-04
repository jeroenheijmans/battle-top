module("Condition View Model");


test( "Default number of rounds left is 1", function() {
    var viewModel = new battleTop.viewModels.conditionViewModel();
    deepEqual(viewModel.roundsLeft(), 1);
});


test( "Constructor can take data argument with defaults", function() {
    var data = {
        name: 'Dazed',
        roundsLeft: 3
    };
    
    var viewModel = new battleTop.viewModels.conditionViewModel(data);
    
    deepEqual(viewModel.name(), 'Dazed');
    deepEqual(viewModel.roundsLeft(), 3);
});


test( "Rounds left indication will include parentheses and turns-character", function() {
    var viewModel = new battleTop.viewModels.conditionViewModel();
    viewModel.roundsLeft(3);
    deepEqual(viewModel.roundsLeftIndication(), '(3↺)');
});