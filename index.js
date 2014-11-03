'use strict';

var fn = require('./fn'),
    data = require('./reddit');

function testToArray() {
    var ar = fn.toArray(arguments);

    return ar;
}

//console.log( testToArray(1, 2, 3) );

// if (!isNaN(foo)) {}

var isNumber = fn.invert(isNaN);

// console.log( isNumber(12) );



function sum(a, b) {
    return a + b;
}

var shiftedSum = fn.shift(sum, 2);

// console.log( shiftedSum(10, 30, 40, 50) );


function divide(a, b) {
    return a / b;
}

var reversedDivide = fn.reverse(divide);

//console.log( reversedDivide( 10, 50 ) );

function getData(data) {
    return data.data;
}

function getChildren(data) {
    return data.children;
}

function getFirstChildData(data) {
    return data[0].data;
}

function getAuthor(data) {
    return data.author;
}

var getFirstAuthor = fn.compose( getAuthor, getFirstChildData, getChildren, getData );

//console.log( getFirstAuthor(data) );


var getFirstAuthorSeq = fn.sequence(getData, getChildren, getFirstChildData, getAuthor);

//console.log( getFirstAuthorSeq(data) );


var children = getChildren(getData(data));

//console.log( children.length );

fn.each(children, function(child) {
    //console.log(child.data.permalink);
});

//var scores = children.map(function(child) {
//    return {id: child.data.id, score: child.data.ups - child.data.downs};
//});

var scores = fn.map(children, function(child) {
   return {id: child.data.id, score: child.data.ups - child.data.downs};
});

// console.log(scores);


var above2k = fn.filter(scores, function(meta) {
    return meta.score > 2000;
});

var below2k = fn.filter(scores, function(meta) {
    return meta.score <= 2000;
});

// console.log('-----');
// console.log(below2k);

var hasSomeAbove2k = fn.some(scores, function(meta) {
    return meta.score > 2000;
});

var hasAllAbove2k = fn.every(scores, function(meta) {
    return meta.score > 2000;
});

//console.log(hasSomeAbove2k);
//console.log(hasAllAbove2k);

var merged = [above2k, below2k];

var flattened = fn.flatten(merged);

// console.log('--------');
// console.log(flattened);

var mapped = fn.flatMap(merged, function(ar) {
   return fn.map(ar, function(el) {
       return el.id + '-' + el.score;
   });
});

// console.log('--------');
// console.log(mapped);


var reduced = fn.reduce(mapped, function(acc, current) {
    return acc + parseInt(current.split('-')[1], 10);
}, 0);

//console.log('--------');
//console.log( reduced );

var zipped = fn.zip(above2k, below2k, function(a, b) {
   return JSON.stringify(a) + '--' + JSON.stringify(b);
});

console.log(zipped);