/*

                                .-') _   ,-.,-.
                               ( OO ) ) /  ||  \
       ,------.,--. ,--.   ,--./ ,--,' '  .''.  '
    ('-| _.---'|  | |  |   |   \ |  |\ |  |  |  |
    (OO|(_\    |  | | .-') |    \|  | )|  |  |  |
    /  |  '--. |  |_|( OO )|  .     |/ |  |  |  |
    \_)|  .--' |  | | `-' /|  |\    |  '  '..'  '
      \|  |_) ('  '-'(_.-' |  | \   |   \  ||  /
       `--'     `-----'    `--'  `--'    `-'`-'

    Functional Programmming Is Fun!

    (with bite-sized examples, without going into gruesome techincality)

 */

//  It's all about Abstraction

(function() {
    'use strict';

    function sum(limit) {
        var total = 0, count = 1;

        while (count <= limit) {
            total += count;
            count += 1;
        }

        return total;
    }

    function betterSum(limit) {
        return add(range(0, limit));
    }

    function add(collection) {
        return collection.reduce(function(num, acc) {
            return num + acc;
        }, 0);
    }

    function range(begin, end) {
        var i, result = [];

        for (i = begin; i <= end; i++) {
            result.push(i);
        }

        return result;
    }
}());

// #
// # Higher Order Functions
// #

//
// The above example was "abstraction over values".
//
// Higher-order functions allow us to abstract over "actions",
// not just the values.
//

// ##
// ## Basics
// ##

(function() {
    'use strict';

    // At its very basic...

    function eatBurrito() {}

    function eat() {return eatBurrito;}

    eatBurrito();

    eat()();

    // Higher order functions are just like burritos:
    // The consumer will never know that the function has before consuming it.
    //
    // Also, higher order functions are kind of lazy:
    // Instead of executing it right now ,we create a 'computation'
    // to be executed later.
});

// ##
// ## Applications
// ##

(function() {
    'use strict';

    var blueprints = {
        cupboardUnderTheStairs: function() {
            return {
                area: 130,
                windows: 0,
                hasAc: false,
                bed: 1,
                bath: 0
            };
        },

        matchBox: function() {
            return {
                area: 150,
                windows: 4,
                hasAc: true,
                bed: 1,
                bath: 1
            };
        }
    };

    function computeRental(houseJson) {
        return houseJson.area * (
            houseJson.windows + houseJson.bed + houseJson.bath
        ) + houseJson.hasAc ? 300 : 0;
    }

    function computeRentFromBluePrint(blueprint) {
        return computeRental(blueprint());
    }

    /*
     * Look Ma!
     * I'm passing a function to a function, and returning another function.
     * Functions are soooo first-class citizens.
     * I'm lovin' them!
     */
    var rentCalculator = function(blueprint) {
        return function() {
            return computeRentFromBluePrint(blueprint);
        };
    };

    var cupboardRentCalculator = rentCalculator(
        blueprints.cupboardUnderTheStairs
    );

    cupboardRentCalculator(); // gives you the rent estimate.
});


(function() {
    'use strict';

    function greaterThan(m) {
      return function(m) { return m > n; };
    }

    var greaterThanTen = greaterThan(10);

    // Note:
    // There are more clever ways of doing this,
    // but this one is the gist of it.

    function spyOn(f, context, name) {
        return function() {
            console.log('Calling ' + name);

            var result = f.apply(context, arguments);

            console.log('Called ' + name);
            console.log('Called with: ' + arguments);
            console.log('The result is: ' + result);

            return result;
        };
    }

    spiedFn = spyOn(greaterThan, {}, 'greaterThanTen');

    spiedFn(12);
}());

// #
// # Reflection
// #

(funciton() {
    'use strict';

    function multiply(a, b) {
        return a * b;
    }

    function power(up) {
        return Math.pow(this.base, up);
    }

    function callMultiply(a, b) {
        return multiply.call(null, a, b);
    }

    function applyMultiply(a, b) {
        return multiply.apply(null, [a, b]);
    }

    function callPowerOfTwo(n) {
        return power.call({base: 2}, n);
    }

    function applyPowerOfTwo() {
        return power.apply({base: 2}, arguments);
    }

    applyPowerOfTwo(42);
}());

// #
// # Closures
// #

(function() {
    'use strict';

    function sayHello(name) {
        var text = 'Hello ' + name;

        function sayMyName() { console.log(text); }

        sayMyName();
    }

    function sayHello2(name) {
        var text = 'Hello ' + name;

        function sayMyName() { console.log(text); }

        return sayMyName;
    }

    // Cover it in the next session.
    function buildList(list) {
        var result = [];

        for (var i = 0; i < list.length; i++) {
            var item = 'item' + list[i];

            result.push( function() {console.log(item + ' ' + list[i])} );
        }

        return result;
    }

    function testList() {
        var fnlist = buildList([1,2,3]);

        // using j only to help prevent confusion - could use i
        for (var j = 0; j < fnlist.length; j++) {
            fnlist[j]();
        }
    }
}());

// #
// # Curried Fries and Partial Potatoes
// #

(function() {
    function add(a, b) {return a + b;}

    function makeAdder(a) {
        return function(b) {
            return add(a, b);
        }
    }

    var addFive = makeAdder(5);

    addFive(12);

    function bindFirstArg(fn, a) {
        return function(b) {
            return fn(a, b);
        };
    }

    eat()();

    bindFirstArg(add, 12)(15);

    var addOne = bindFirstArg(1);

    function createAdder = bindFirstArg(bindFirstArg, 1);

    var newAddOne = createAdder(1);

    function partial(fn /*, args...*/) {
        var slice = Array.prototype.slice,
            args = slice.call(arguments, 1);

        return function() {
            return fn.apply(
                this,
                args.concat(slice.call(arguments))
            );
        }
    }

    var partialAdd = partial(add, 5);

    partialAdd(6);

    // Sounds like Haskell.
    // Double check.
    function curry(fn, n) {

        // To manually override "arity".
        if (typeof n !== 'number') {
            n = fn.length;
        }

        function getCurriedFn(prev) {
            return function(arg) {
                var args = prev.concat(arg);

                if (args.length < n) {
                    return getCurriedFn(args);
                } else {
                    return fn.apply(this, args);
                }
            };
        }

        return getCurriedFn([]);
    }

    // function bozo() {
    //     arguments[1] =
    // }

    Function.prototype.bind;


    function add(a, b, c) {
        var sum = a + b + c;
        return a + ' + ' + b + ' + ' + c + ' = ' + sum;
    }

    var boundAdd = add.bind(null, 12, 13);

    boundAdd(15);

    add(1, 2, 3);

    var curriedAdd = curry(add);

    var halfAdd = curiedAdd(1);

    var anotherAdd = halfAdd(5);

    anotherAdd(12);

    //halfAdd(3);

    var addOnePartial = partial(add, 1);

    addOnePartial(2, 3); // "1 + 2 + 3 = 6"
    addOnePartial(2);    // "1 + 2 + undefined = NaN"

    var addOneCurried = curry(add)(1);

    // Now this looks "much" like Haskell.
    addOneCurried(2)(3);

    var addCurriedMore = addOneCurried(2);

    addCurriedMore(3);
}());

// #
// # Apply and Bind
// #

(function() {
    'use strict';

    //var prop = 123;

    var obj = {
        prop: 1,
        add: function(a, b) {
            var sum = this.prop + a + b;

            return this.prop + ' + ' + a + ' + ' + b + ' = ' + sum;
        }
    };

    obj.add(2, 3);

    var add = obj.add;

    add.call(obj, 4, 5);
    ddd.apply(obj, [6, 7]);

    var goodAdd = obj.add.bind(obj);

    badAdd = obj.add;

    badAdd(12, 15);

    goodAdd(8, 9);

    var goodAddEvenMore = obj.add.bind(obj, 10);

    goodAddEvenMore(11);

    obj.prop = 99;
    goodAdd(5, 6);

    goodAddEvenMore(7);
})();

//
// WARNING:
//
// You may need to revisit the stuff below.
//
// It's kind of fun, in a "complicated" way.
//

(function() {
    'use strict';

    // add.bind({}, 2, 3);
    //
    // is the same as
    //                            //ctxFn, ctx, varargin
    // Function.prototype.bind.call(add, {}, 2, 3)
    //
    // similarly
    //
    // Function.prototype.apply.call(add, {}, [2, 3]);
    //
    // Function.prototype.apply.bind(add, {}, [2, 3]);
    //
    // if just a higher order cousin.
    //
    // add.call({}, 2, 3);
    //
    // is the same as.
    //                              ctx   args...
    // Function.prototype.call.bind(add, {}, 2, 3)()
    // Function.prototype.call.bind(fn, ctx, args)
    // ( fn.call(ctx, args) )
    //
    // Replace add with Function.prototype.bind
    //
    // Function.prototype.call.bind(Function.prototype.bind)
    //
    // Function.prototype.call.bind(
    //      Function.prototype.apply)(add, {}, [2, 3])

    // "Voila!" Monment>

    var bind = Function.prototype.call.bind(Function.prototype.bind),
        call = bind(Function.prototype.call, Function.prototype.call),
        apply = bind(Function.prototype.call, Function.prototype.apply);

    // Function.prototype.bind.call(fn, ctx, varargin)
    // Function.prototype.bind.call(fpc, fpc) (fn, ctx, varargin)
    // Function.prototype.bind.call(Function.prototype.call, Function.prototype.apply)
    // Function.prototype.call.bind(Function.prototype.apply, fn, ctx, [args])
    // ( Function.prototype.apply.call(fn, ctx, [args]) )
}());

(function() {
    'use strict';

    // Function.prototype.bind.call(fn, ctx, varargin)
    // ( fn.call(ctx, varargin) )

    // Instead of having to use slice.call every time...
    var args = Array.prototype.slice.call(arguments);

    // You can just use slice without .call by binding slice to call!
    var toArray = Function.prototype.call.bind(Array.prototype.slice);

    args = toArray(arguments);

    Math.max(15, -10, 0, 5, 10); // 15

    Math.max([15, -10, 0, 5, 10]); // NaM!

    var newMax = Function.prototype.apply.bind(Math.max)

    newMax([15, -10, 0, 5 ,10]); // 15! Voila!
}());

/*
 * This is just the beginning :)
 */

// These (and more) will be the topics of the next session.
// Map, Reduce, Filter
// Recursion
// Trampolines
// Thunks (maybe)

