module("Date extension tests");

test( "Can get formatted time", function() {
    var myDate = new Date(2013, 6, 23, 13, 6, 4);
    
    deepEqual(myDate.getFormattedTime(), '13:06:04');
});