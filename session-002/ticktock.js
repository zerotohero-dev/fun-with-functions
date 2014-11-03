'use strict';

var clock = new (require('./clock'))();

clock.on('tick', function(time) {
    console.log({hello: 'world', ts: time});
});

clock.start(12000);

setTimeout(function() {
    clock.stop();

    setTimeout(function() {
        clock.start(8000);
    }, 3000);
}, 5000);
