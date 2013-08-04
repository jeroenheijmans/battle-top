module("HP Change View Model");


test( "Default type of HP change is 'damage'", function() {
    var viewModel = new battleTop.viewModels.hpChangeViewModel();
    deepEqual(viewModel.hpChangeType(), "damage");
});


test( "Default amount of HP change is 1", function() {
    var viewModel = new battleTop.viewModels.hpChangeViewModel();
    deepEqual(viewModel.hpChangeAbsolute(), 1);
});


test( "HP change of type 'damage' gives negative HP change", function() {
    var data = {
        hpChangeType: 'damage',
        hpChangeAbsolute: 42
    };

    var viewModel = new battleTop.viewModels.hpChangeViewModel(data);
    
    deepEqual(viewModel.hpChangeTotal(), -42);
});


test( "HP change of type 'healing' gives positive HP change", function() {
    var data = {
        hpChangeType: 'healing',
        hpChangeAbsolute: 42
    };

    var viewModel = new battleTop.viewModels.hpChangeViewModel(data);
    
    deepEqual(viewModel.hpChangeTotal(), 42);
});