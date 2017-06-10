// Modules
const request = require('request');

// Models
const webRequestMethods = require('../../models/web-request-methods');

const _performGet = function (url, success, error) {
    request
        .get(url)
        .on('response', (response) => {
            success(response);
        }).on('error', (errResponse) => {
            if (error && typeof error === 'function') {
                error(errResponse);
            }
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
            if (complete && typeof complete === 'function') {
                complete(response.statusCode);
            }
        }, (errResponse) => {
            if (error && typeof error === 'function') {
                error(errResponse);
            }
        });
    }
}

module.exports = {
    perform: _perform
}