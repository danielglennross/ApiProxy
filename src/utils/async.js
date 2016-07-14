'use strict';

module.exports = (makeGenerator) => {
    // dont use fat arrow, as we dont want 'this' lexically bound
    return function () {
        var generator = makeGenerator.apply(this, arguments);

        function handle(result){
            // result => { done: [Boolean], value: [Object] }
            if (result.done) return Promise.resolve(result.value);

            return Promise.resolve(result.value).then(res => {
                return handle(generator.next(res));
            }, err => {
                return handle(generator.throw(err));
            });
        }

        try {
            return handle(generator.next());
        } catch (ex) {
            return Promise.reject(ex);
        }
    };
};