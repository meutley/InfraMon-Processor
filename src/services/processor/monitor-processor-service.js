// Utilities
const intervalUtility = require('../../utilities/interval-utility');

// Services
const monitorActionServices = require('../monitor-actions');
const webRequestService = monitorActionServices.webRequest;
const pingRequestService = monitorActionServices.ping;

// Models
const monitorTypes = require('../../models/monitor-types');

var MonitorProcessorService = function (monitor) {
    this._monitor = monitor;
    this._monitorInterval = null;
}

MonitorProcessorService.prototype.start = function () {
    this._monitorInterval = intervalUtility.getMillisecondsFromMonitorFrequency(
        this._monitor.frequencyAmount,
        this._monitor.frequencyPeriod);

    if (this._monitorInterval <= 0) {
        throw `Invalid frequency amount. Processed as: ${this._monitorInterval}, from ${this._monitor.frequencyAmount} ${this._monitor.frequencyPeriod}`;
    } else {
        this._monitorInterval = setInterval(() => {
            this.monitorInterval();
        }, this._monitorInterval);
    }
}

MonitorProcessorService.prototype.stop = function () {
    if (this._monitorInterval) {
        clearInterval(this._monitorInterval);
    }
}

MonitorProcessorService.prototype.monitorInterval = function () {
    switch (this._monitor.type) {
        case monitorTypes.webRequest:
            this.doWebRequest();
            break;
        case monitorTypes.ping:
            this.doPing();
            break;
    }
}

MonitorProcessorService.prototype.doWebRequest = function () {
    // TODO: Perform web request and persist results in database
}

MonitorProcessorService.prototype.doPing = function () {
    // TODO: Perform ping and persist results in database
}

module.exports = MonitorProcessorService;