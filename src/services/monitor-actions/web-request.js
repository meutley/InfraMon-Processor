// Modules
const request = require('request');

// Models
const webRequestMethods = require('../../models/web-request-methods');

const _performGet = function (url, callback) {
    request
        .get(url)
        .on('response', (response) => {
            callback(response);
        });
}

const _perform = function (webRequestDetails, complete, error) {
    var methodAction = null;
    switch (webRequestDetails.method) {
        case webRequestMethods.GET:
            methodAction = _performGet;
            break;
    }

    if (methodAction && typeof methodAction === 'function') {
        methodAction(webRequestDetails.url, (response) => {
            console.log(response.statusCode);
        });
    }
}

module.exports = {
    perform: _perform
}