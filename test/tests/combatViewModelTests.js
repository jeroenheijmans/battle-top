module("Combat View Model");


test( "Can construct default view model", function() {
    var viewModel = new battleTop.viewModels.combatViewModel();
    notDeepEqual(viewModel, null);
});