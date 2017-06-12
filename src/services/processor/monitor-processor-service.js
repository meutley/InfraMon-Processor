// Utilities
const intervalUtility = require('../../utilities/interval-utility');

// Services
const monitorActionServices = require('../monitor-actions');
const webRequestService = monitorActionServices.webRequest;
const pingRequestService = monitorActionServices.ping;

// Models
const monitorTypes = require('../../models/monitor-types');

// Repositories
const monitorStatsRepository = require('../../data-access/repository/monitor-stats-repository');

var MonitorProcessorService = function (monitor) {
    this._monitor = monitor;
    this._monitorInterval = null;
    this.isRunning = false;

    this.getMonitorId = function () {
        return this._monitor._id;
    }
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

        this.isRunning = true;
    }
}

MonitorProcessorService.prototype.stop = function () {
    if (this._monitorInterval) {
        clearInterval(this._monitorInterval);
    }
    
    this.isRunning = false;
}

MonitorProcessorService.prototype.monitorInterval = function () {
    switch (this._monitor.type) {
        case monitorTypes.webRequest:
            // this.doWebRequest();
            break;
        case monitorTypes.ping:
            // this.doPing();
            break;
    }
}

MonitorProcessorService.prototype.doWebRequest = function () {
    webRequestService.perform(
        this._monitor.webRequestDetails, (statusCode) => {
            monitorStatsRepository.addWebRequestResult(
                this._monitor._id,
                {
                    requestDateTime: new Date(),
                    statusCode: statusCode
                },
                null, null);
        }, (error) => {

        });
}

MonitorProcessorService.prototype.doPing = function () {
    // TODO: Perform ping and persist results in database
}

module.exports = MonitorProcessorService;