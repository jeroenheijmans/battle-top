module("Combat View Model");


test( "Can construct default view model", function() {
    var viewModel = new battleTop.viewModels.battleTopViewModel();
    ok(true);
});


test( "Can toggle about info", function() {
    var viewModel = new battleTop.viewModels.battleTopViewModel();
    viewModel.showAboutInfo(false);
    viewModel.toggleAboutInfo();
    deepEqual(viewModel.showAboutInfo(), true);
});


test( " Can toggle setup mode", function() {
    var viewModel = new battleTop.viewModels.battleTopViewModel();
    viewModel.isInSetupMode(false);
    viewModel.toggleSetupMode();
    deepEqual(viewModel.isInSetupMode(), true);    
});