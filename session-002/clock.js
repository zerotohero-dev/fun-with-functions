'use strict';

var EventEmitter = require('events').EventEmitter,
    Clock = function() {},

    kInterval = 100,
    intervalId;

function extend(ctor, superCtor) {
    ctor.super_ = superCtor;

    ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
        }
     });
}

extend(Clock, EventEmitter);

//util.inherits(Clock, EventEmitter);

function getTimestamp() {return (new Date()).getTime();}

Clock.prototype.start = function(offset) {
    var that = this,
        startTime = getTimestamp() - (offset || 0);

    intervalId = setInterval(function() {
        that.emit('tick', getTimestamp() - startTime);
    }, kInterval);
};

Clock.prototype.stop = function() {
    clearInterval(intervalId);
};

module.exports = Clock;
