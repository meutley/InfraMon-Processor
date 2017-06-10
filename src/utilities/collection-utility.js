const _ = require('lodash');

const _forEachWithCallback = function (collection, action, callback) {
    if (collection && collection.length > 0) {
        const count = collection.length;
        var currentIndex = 0;
        var isCallbackValid = callback && typeof callback === 'function';
        
        _.forEach(collection, (item) => {
            action(item);
            currentIndex++;

            if (currentIndex === count && isCallbackValid) {
                callback();
            }
        });
    }
}

const _doForEach = function (collection, action) {
    _forEachWithCallback(collection, action, null);
}

module.exports = {
    forEachWithCallback: _forEachWithCallback,
    doForEach: _doForEach
}