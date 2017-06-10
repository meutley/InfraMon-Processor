// Utilities
const collectionUtility = require('../../utilities/collection-utility');

// Services
const dataLoadService = require('../data/data-load-service');
const MonitorProcessorService = require('./monitor-processor-service');

// Models
const modelMapping = require('../../models/mapping');
const monitor = require('../../models/monitor');

const _refreshInterval = 1000;

const _logToConsole = function (message) {
    console.log('\n\n============================================\n');
    console.log(message + '\n');
    console.log('============================================\n\n');
}

const _buildMonitorProcessors = function (monitors, callback) {
    const monitorProcessors = [];
    const count = monitors.length;
    var currentIndex = 0;
    
    collectionUtility.forEachWithCallback(monitors, (monitor) => {
        monitorProcessors.push(new MonitorProcessorService(monitor));
    }, () => { callback(monitorProcessors) });
}

var ProcessorService = function () {
    this.monitors = [];
}

ProcessorService.prototype.start = function (onMonitorsLoaded) {
    _logToConsole('Process service started');

    var refreshInterval = null;
    
    var tempMonitors = [];
    dataLoadService.monitor.getAll((data) => {
        const count = data.length;
        var currentIndex = 0;

        if (count > 0) {
            // Fetch each monitor from the collection
            collectionUtility.forEachWithCallback(data, (entity) => {
                tempMonitors.push(modelMapping.monitor.fromEntity(entity));
            }, () => {
                this.monitors = tempMonitors;
                tempMonitors = null;
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

            _buildMonitorProcessors(this.monitors, (monitorProcessors) => {
                this.monitorProcessors = monitorProcessors;
                this.startMonitorProcessors();
            });
        }
    }, _refreshInterval);
}

ProcessorService.prototype.stop = function () {
    console.log('\nStopping individual monitor processes...');
    collectionUtility.doForEach(this.monitorProcessors, (monitorProcessor) => {
        monitorProcessor.stop();
    });
    
    _logToConsole('Processor service stopped');
}

ProcessorService.prototype.startMonitorProcessors = function () {
    collectionUtility.doForEach(this.monitorProcessors, (monitorProcessor) => {
        monitorProcessor.start();
    });
}

module.exports = ProcessorService;