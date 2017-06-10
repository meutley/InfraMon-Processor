const monitorMapping = require('./monitor-mapping');
const webRequestDetailsMapping = require('./web-request-details-mapping');
const pingDetailsMapping = require('./ping-details-mapping');
const webRequestResultMapping = require('./web-request-result-mapping');

module.exports = {
    monitor: monitorMapping,
    webRequestDetails: webRequestDetailsMapping,
    pingDetails: pingDetailsMapping,
    webRequestResult: webRequestResultMapping
}