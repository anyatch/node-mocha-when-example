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

//Just check that foo actually returns foo
describe('when calling foo.foo()', function () {
    it('should return "foo"', function() {
        var foo = requirejs(__dirname + "/../src/foo.js");
        foo.foo().should.equal("foo");
    });
});

// mocha + when - the result is as expected, test passes:
describe('when calling bar.bar()', function () {
    var bar = requirejs("bar");
    it('should return "bar"', function() {
        return bar.bar()
            .then(function(barResult) {
                barResult.should.equal("bar");
            })
    });
});

//mocha + when: the result is not as expected so the test fails:
describe('when calling bar.bar()', function () {
    var bar = requirejs("bar");
    it('should return "bar"', function() {
        return bar.bar()
            .then(function(barResult) {
                barResult.should.equal("NOT BAR");
            })
    });
});

//mocha + when + async requirejs: the result is as expected, the test passes:
describe('when calling bar.bar() with async requirejs, right outout', function () {
    it('should return "bar"', function() {
        var result = when.defer();
        requirejs(["bar"], function(bar) {
            result.resolve(bar.bar());
        })

        return result.promise.then(function(barResult) {
            barResult.should.equal("bar");
        });

    });
});

//mocha + when + async requirejs: the result is not as expected, the test fails:
describe('when calling bar.bar() with async requirejs, wrong output', function () {
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


//mocha + when + async requirejs: When an error occurres in bar the test fails with the right error:
describe('when calling bar.bar() with async requirejs, with error', function () {
    it('should return "bar"', function() {
        var result = when.defer();
        requirejs(["bar"], function(bar) {
            result.resolve(bar.barWithError());
        })

        return result.promise.then(function(barResult) {
            barResult.should.equal("bar");
        });

    });
});