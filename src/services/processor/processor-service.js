const _ = require('lodash');

const dataLoadService = require('../data/data-load-service');
const monitor = require('../../models/monitor');
const modelMapping = require('../../models/mapping');

const _logToConsole = function (message) {
    console.log('\n\n============================================\n');
    console.log(message + '\n');
    console.log('============================================\n\n');
}

var ProcessorService = function () {
    this.monitors = [];
}

ProcessorService.prototype.start = function () {
    _logToConsole('Process service started');

    var refreshInterval = null;
    
    var tempMonitors = [];
    dataLoadService.monitor.getAll((data) => {
        const count = data.length;
        var currentIndex = 0;

        if (count > 0) {
            // Fetch each monitor from the collection
            _.forEach(data, (entity) => {
                tempMonitors.push(modelMapping.monitor.fromEntity(entity));
                currentIndex++;

                // If we've fetched all monitors, copy them to the local property
                if (currentIndex === count) {
                    this.monitors = tempMonitors;
                    tempMonitors = null;
                }
            });
        } else {
            return;    // No monitors; just exit
        }
    }, (err) => {
        if (refreshInterval) {
            clearInterval(refreshInterval);
        }
    });

    refreshInterval = setInterval(() => {
        if (this.monitors.length > 0) {
            console.log(`Found ${this.monitors.length} monitor(s). Starting monitor tasks.`);
            clearInterval(refreshInterval);
        }
    }, 5000);
}

ProcessorService.prototype.stop = function () {
    _logToConsole('Processor service stopped');
}

module.exports = ProcessorService;