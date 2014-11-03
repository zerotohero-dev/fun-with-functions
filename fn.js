'use strict';

var slice = Array.prototype.slice;

function toArray(args) {
    return slice.call(args);
}

exports.toArray = toArray;

exports.invert = function(predicate, context) {
    return function() {
        return !predicate.apply(context || this, arguments);
    }
};

exports.shift = function(fn, len, context) {
    return function() {
        var args = slice.call(arguments, len);

        return fn.apply(context || this, args);
    };
};

exports.reverse = function(delegate, context) {
    return function() {
        return delegate.apply(context || this, toArray(arguments).reverse());
    };
};

// f1(f2(f3(f4(arg1, arg2, arg3))))
// fn.compose(f1, f2, f3, varargin...)
exports.compose = function(/* f1, f2, ..., fn */) {
    var fns = arguments,
        length = arguments.length;

    return function () {
        var i = length,
            args = arguments;

        // we need to go in reverse order
        while (i-- > 0) {
            args = [fns[i].apply(this, args)];
        }

        return args[0];
    };
};

exports.sequence = function (/* f1, f2, ..., fn */) {
    var fns = arguments,
        length = arguments.length;

    return function () {
        var i = 0,
            args = arguments;

        // we need to go in reverse order
        while (i < length) {
            args = [fns[i].apply(this, args)];

            i++;
        }

        return args[0];
    };
};

exports.each1 = function(ar, delegate) {
    var i, len;

    for (i = 0, len = ar.length; i < len; i++) {
        delegate(ar[i], i, ar);
    }
};

exports.each = function(ar, delegate) {
    ar.forEach(delegate);
};

exports.map1 = function(ar, delegate) {
    var i, len, result = [];

    for (i = 0, len = ar.length; i < len; i++) {
        result[i] = delegate(ar[i], i, ar);
    }

    return result;
};

exports.map = function(ar, delegate) {
    return ar.map(delegate);
};

exports.filter1 = function(ar, predicate) {
    var result = [];

    exports.each(ar, function(item/*, index, ar*/) {
        if (predicate(item)) {
            result.push(item);
        }
    });

    return result;
};

exports.filter = function(ar, predicate) {
    return ar.filter(predicate);
};

exports.some1 = function(ar, predicate) {
    var result = false;

    exports.each(ar, function(item/*, index, ar*/) {
        if (predicate(item)) {result = true;}
    });

    return result;
};

exports.some = function(ar, predicate) {
    return ar.some(predicate);
};

exports.every1 = function(ar, predicate) {
    return exports.some(ar, exports.invert(predicate));
};

exports.every = function(ar, predicate) {
    return ar.every(predicate);
};

exports.flatten = function(ar) {
    var result = [];

    ar.forEach(function(subArray) {
        result.push.apply(result, subArray);
    });

    return result;
};

// [ [a], [b], [c] ]
// [ [a1], [b1], [c1] ]
// [ a1, b1, c1 ]
exports.flatMap = function(ar, arrayReturningDelegate) {
    return exports.flatten(
        exports.map(ar, arrayReturningDelegate)
    );
};

exports.reduce1 = function(ar, feedback, initialValue) {
    if (!ar.length) {return ar;}

    var initialValuePresent = arguments.length === 3,
        initialIndex, accumulated, i, len;

    if (initialValuePresent) {
        initialIndex = 0;
        accumulated = arguments[2];
    } else {
        initialIndex = 1;
        accumulated = ar[0];
    }

    for (i = initialIndex, len = ar.length; i < len; i++) {
        accumulated = feedback(accumulated, ar[i]);
    }

    return accumulated;
};

exports.reduce = function(ar, feedback, initialValue) {
    return ar.reduce(feedback, initialValue);
};

exports.reduceRight = function(ar, feedback, initialValue) {
    return ar.reduceRight(feedback, initialValue);
};

exports.zip = function(leftArray, rightArray, zipper) {
    var counter,
        result = [],
        len = Math.min(leftArray.length, rightArray.length);


    for (counter = 0; counter < len; counter++) {
        result.push(zipper(leftArray[counter], rightArray[counter]));
    }

    return result;
};
