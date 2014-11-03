'use strict';

function add(otherPoint) {
    this.x += otherPoint.x;
    this.y += otherPoint.y;
}

var point = {
    x: 10, 
    y: 20,
    add: add
};

var point2 = {
    x: 10, 
    y: 20,
    add: add
};

var sum = point2.add(point1);

var collection = [];

console.log(Object.getPrototypeOf(point)      === Object.prototype);
console.log(Object.getPrototypeOf(collection) === Array.prototype);

console.log(Object.getPrototypeOf(Object.prototype) === null);
console.log(Object.getPrototypeOf(Array.prototype)  === Object.prototype);

// point
//      __proto__ -> Object.prototype
//                                   __proto__ -> null
//
//
// collection
//           __proto__  -> Array.prototype
//                                        __proto__ -> Object.prototype
//                                                                     __proto__ -> null

collection instanceof Array
collection instanceof Object

//var foo = new Bar();
//foo.__proto__ = Bar.protoype

//var apple = new Apple();

// Prototype Chain

(function() {
    function() {
        
    }
})

var d = new Date();

console.log(d.getTime instanceof Function         === true);
console.log(d.hasOwnProperty('getTime')           === false);
console.log(d.__proto__.hasOwnProperty('getTime') === true);

// -----------------------------------------------------------------------------

// These confuse the uninitiated.
console.log(point.prototype      === undefined);
console.log(collection.prototype === undefined);

point instanceof Point

console.log(point.__proto__);
console.log(collection.__proto__);

// Meaning: primitive types (number, string, array, date, regexp) don't have prototypes
// But since they have a __proto__ they "inherit" methods from other objects.

var d = new Date();

console.log(d.prototype === undefined);
console.log(d.__proto__ === Date.prototype);
console.log(d.getTime   === Date.prototype.getTime);

// Same is true for String, RegExp, Date, Array, Boolean instances.

console.log(true.prototype           === undefined);
console.log((1).prototype            === undefined);
console.log((new Array()).prototype  === undefined);
console.log((new RegExp()).prototype === undefined);

// Special Case "functions" -- they are first-level citizens.

var f = new Function('alert("Hello")');

console.log(f.prototype instanceof Object);
console.log(f.prototype.constructor === f)

var f2 = function() {};

console.log(f2.prototype instanceof Object);
console.log(f2.prototype.constructor === f2);

console.log( (function(){}).prototype instanceof Object);

// -----------------------------------------------------------------------------

// This allows us to use lambda Constructors

var newYork = new (function(size) {
    this.isApple = true;
    this.size = size;
})('big');

// Which is the same as:

function NewYork(size) {
    this.isApple = true;
    this.size = size;
}

var newYorknewYork = new NewYork('big');

// -----------------------------------------------------------------------------

// instanceof operator checks the __proto__ chain, **NOT** the `prototype` chain.
// 
// Actually, there's no such thing as a "prototype" chain. What's meant by
// the "prototype chain" is the __proto__ chain in deed.

// -----------------------------------------------------------------------------

// point
//      __proto__ -> Object.prototype
//                                   __proto__ -> null
//
//
// collection
//           __proto__  -> Array.prototype
//                                        __proto__ -> Object.prototype
//                                                                     __proto__ -> null

console.log(point      instanceof Object);
console.log(collection instanceof Array);
console.log(collection instanceof Object);

console.log(Object.getPrototypeOf(point)            === Object.prototype);
console.log(Object.getPrototypeOf(collection)       === Array.prototype);
console.log(Object.getPrototypeOf(Object.prototype) === null);
console.log(Object.getPrototypeOf(Array.prototype)  === Object.prototype);


// Caveat: `Foo.prototype` and `Foo` are two different things!

console.log(typeof Array                 === 'function');
console.log(Object.getPrototypeOf(Array) === Function.prototype);
console.log(typeof function(){}          === 'function');

console.log(Object.getPrototypeOf(function(){}) === Function.prototype);

console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype);

// This causes confusion too:
console.log(Object.getPrototypeOf(Array) !== Array.prototype);

// Array
//      __proto__ -> Function.prototype
//                                     __proto__ -> Object.prototype
//                                                                  __proto__ -> null

// function(){}
//             __proto__ -> Function.protoype
//                                           __proto__ -> Object.prototype
//                                                                        __proto__ -> null

//function Banana() {}
//Banana.prototype.constructor ==== Banana


// -----------------------------------------------------------------------------

// Constructor Functions

function Point(x, y) {
    this.x = x;
    this.y = y;
};

var ppt = new Point(12, 15);

ppt.x === 12;

Point.prototype.add = function(x, y) {
    this.x += x;
    this.y += y;
};

//var foo = new Point();
//
//foo.__proto__

console.log(Point.prototype.constructor === Point);

var origin = new Point(0, 0); // var o = {};
                              // o.__proto__ = Point.prototype;
                              // return Point.call(o, 0, 0);


console.log(origin.constructor === Point.prototype.constructor);
console.log(origin instanceof Point);

function WeightedPoint(x, y, w) {
    this.x = x;
    this.y = y;
    this.weight = w;
};

// Classical way:
WeightedPoint.prototype = new Point(0, 0);
WeightedPoint.prototype.constructor = WeightedPoint;

//var baz = new WeightedPoint(12, 12, 12);

WeightedPoint.prototype.computeCohesion = function(anotherPoint) {
    return this.weight * anotherPoint.weight;
};

var wp = new WeightedPoint(10, 10, 12);


// wp
//   __proto__ -> WeightedPoint.prototype
//                                       __proto__ -> Point.prototype
//                                                                   __proto__ -> Object.prototype

console.log(wp instanceof Point);
console.log(wp instanceof WeightedPoint);
console.log(wp instanceof Object)

console.log(wp.add !== undefined);
console.log(wp.computeCohesion !== undefined);

// That's where things start to "feel" like we are doing things the wrong way.
console.log(wp.prototype.constructor === Point);

// Why?

console.log(WeightedPoint.hasOwnProperty('constructor')   === false);
console.log(WeightedPoint.constructor instanceof Function === true);


// Recap:
//var origin = new Point(0, 0); 
            // var o = {};
            // o.__proto__ = Point.prototype;
            // return Point.call(o, 0, 0);

// Point.prototype.constructor === Point
//
// WeightedPoint.prototype.__ptoto__ ==== {__proto__: Point.prototype}
//
// Therefore
//
// WeightedPoint.prototype.constructor ==== WeightedPoint.prototype.__proto__.constructor === Point.

// Let's look into functions a prototypically:

function Bazinga() {}

console.log(Bazinga.constructor           === Function);
console.log(Bazinga.prototype instanceof  Object);
console.log(Bazinga.prototype.constructor === Bazinga);


//   <------------------------------------+
//   |                                    ^
// Bazinga---constuctor-->Function        |
//   |                                    |
//   prototype--constructor---------------+

console.log(Number.constructor  === Function);
console.log(Boolean.constructor === Function);
console.log(Object.constructor  === Function);
console.log(Date.constructor    === Function);
console.log(String.constructor  === Function);

console.log(Number.prototype.constructor  === Number);
console.log(Boolean.prototype.constructor === Boolean);
console.log(Object.prototype.constructor  === Object);
console.log(Date.prototype.constructor    === Date);
console.log(String.prototype.constructor  === String);

// Curious?

//> console.log(Number.toString())
//  function Number() { [native code] }

// So everything in JavaScript is more or less a Function.
// That's why JavaScript is functional, and Functions
// are primary citizens in JavaScript.

// -----------------------------------------------------------------------------

// Recap:

function WeightedPoint(x, y, w) {
    this.x = x;
    this.y = y;
    this.weight = w;
};

// Classical way:
WeightedPoint.prototype = new Point(0, 0);
WeightedPoint.prototype.constructor = WeightedPoint;

WeightedPoint.prototype.computeCohesion = function(anotherPoint) {
    return this.weight * anotherPoint.weight;
};

var wp = new WeightedPoint(10, 10, 12);

// That's a more modern way of inheriting things.

function AwesomePoint() {}

AwesomePoint.prototype = Object.create(Point.prototype);  // Does prototype chaining withouth the burden of
                                                          // running the constructor.

console.log(AwesomePoint.constructor === Function);
console.log(AwesomePoint.prototype.constructor === AwesomePoint);

AwesomePoint.prototype.constructor = AwesomePoint.prototype; // Yeah this is hacky, because we are "forcing"
                                                             // JavaScript to be something that it isn't meant to be.


// More fun with Object.create

function createCrazy() {
    var crazy = Object.create({
        value: 42
    }, {
        level: {
            get: function() {return Math.pow(this.value, 2);},
            set: function(value) {this.value = value/2;}
        }
    });

    return crazy;
};

var silly = createCrazy();

silly.level = 10;

console.log('The level is: ' + silly.level + '.'); // will log 25.

// Learn more at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
