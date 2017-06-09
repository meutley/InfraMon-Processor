const monitorMapping = require('./monitor-mapping');
const webRequestDetailsMapping = require('./web-request-details-mapping');
const pingDetailsMapping = require('./ping-details-mapping');

module.exports = {
    monitor: monitorMapping,
    webRequestDetails: webRequestDetailsMapping,
    pingDetails: pingDetailsMapping
}