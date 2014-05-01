var requirejs = require('requirejs');
requirejs.config({
    baseUrl: __dirname + "/../src",
    packages: [
        {
            name: "squirejs",
            location: "../node_modules/squirejs",
            main: "src/Squire"
        }
    ]
});

var chai = requirejs("chai");
var should = chai.should();
var Squire = requirejs("squirejs");
var when = requirejs('when');

describe('when calling foo.foo()', function () {
    it('should return "foo"', function() {
        var foo = requirejs(__dirname + "/../src/foo.js");
        foo.foo().should.equal("foo");
    });
});

describe('when calling bar.bar()', function () {
    var bar = requirejs("bar");
    it('should return "bar"', function() {
        return bar.bar()
            .then(function(barResult) {
                barResult.should.equal("bar");
            })
    });
});

//This actually fails as it should:
describe('when calling bar.bar()', function () {
    var bar = requirejs("bar");
    it('should return "bar"', function() {
        return bar.bar()
            .then(function(barResult) {
                barResult.should.equal("NOT BAR");
            })
    });
});

// 3 Attempts to make the async requires test fail:


//Try to return the required js result, the tess passes:
describe('when calling bar.bar() with async requirejs 1', function () {
    it('should return "bar"', function() {
        return requirejs(["bar"], function(bar) {
            bar.bar()
                .then(function(barResult) {
                    barResult.should.equal("NOT BAR");
                })
        })

    });
});

//Try to return the bar promise inside the async requirejs, the test passes:
describe('when calling bar.bar() with async requirejs 2', function () {
    it('should return "bar"', function() {
        requirejs(["bar"], function(bar) {
            return bar.bar()
                .then(function(barResult) {
                    barResult.should.equal("NOT BAR");
                })
        })

    });
});

//Ugly patch with when, the test fails but this is very ugly:
describe('when calling bar.bar() with async requirejs 3', function () {
    it('should return "bar"', function() {
        var result = when.defer();
        requirejs(["bar"], function(bar) {
            result.resolve(bar.bar());
        })

        return result.promise.then(function(barResult) {
            barResult.should.equal("NOT BAR");
        });

    });
});