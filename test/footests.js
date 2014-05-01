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

//Try to define a variable and return it later:
describe('when calling bar.bar() with async requirejs', function () {
    it('should return "bar"', function() {
        var result;
        requirejs(["bar"], function(bar) {
            result = bar.bar()
                .then(function(barResult) {
                    barResult.should.equal("NOT BAR");
                })
        })

        return result;
    });
});

//Try to return the required js result:
describe('when calling bar.bar() with async requirejs', function () {
    it('should return "bar"', function() {
        return requirejs(["bar"], function(bar) {
            bar.bar()
                .then(function(barResult) {
                    barResult.should.equal("NOT BAR");
                })
        })

    });
});

//Try to return the bar promise inside the async requirejs:
describe('when calling bar.bar() with async requirejs', function () {
    it('should return "bar"', function() {
        requirejs(["bar"], function(bar) {
            return bar.bar()
                .then(function(barResult) {
                    barResult.should.equal("NOT BAR");
                })
        })

    });
});

