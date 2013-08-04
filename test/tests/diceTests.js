(function() {
    var browserRandom = Math.random;

    module("Character View Model", {
        setup: function() {
            // Mock the random functionality
            Math.random = function() { return 0.5; };
        }, teardown: function() {
            Math.random = browserRandom;
        }
    });

    test( "Default dice roll is single d20 roll", function() {
        var result = battleTop.util.dice.rollDice();
        deepEqual(result, 11);
    });

    test( "Can roll two d20s", function() {
        var result = battleTop.util.dice.rollDice(20, 2);
        deepEqual(result, 22);
    });

    test( "Can roll two d6s", function() {
        var result = battleTop.util.dice.rollDice(6, 2);
        deepEqual(result, 8);
    });
    
})();