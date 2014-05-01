define(['when', 'foo'], function(when, foo) {

    var bar = function() {
        var deferredFoo = when.defer();
        setTimeout(function() {
            deferredFoo.resolve(foo.foo().replace("foo","bar"));
        }, 500);
        return deferredFoo.promise;
    };

    var barWithError = function() {
        var deferredFoo = when.defer();
        setTimeout(function() {
            deferredFoo.reject(new Error("Bar error occurred"));
        }, 500);
        return deferredFoo.promise;
    }

    return {
        bar : bar,
        barWithError: barWithError
    };
});