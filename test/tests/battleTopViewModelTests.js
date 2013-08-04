module("Combat View Model");


test( "Can construct default view model", function() {
    var viewModel = new battleTop.viewModels.battleTopViewModel();
    ok(true);
});


test( "Can toggle about info", function() {
    var viewModel = new battleTop.viewModels.battleTopViewModel();
    viewModel.toggleAboutInfo();
    deepEqual(viewModel.showAboutInfo(), true);
});