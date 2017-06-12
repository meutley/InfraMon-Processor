// Modules
const _ = require('lodash');

// Utilities
const collectionUtility = require('../../utilities/collection-utility');

// Services
const configService = require('../config-service');
const dataLoadService = require('../data/data-load-service');
const MonitorProcessorService = require('./monitor-processor-service');

// Models
const modelMapping = require('../../models/mapping');
const monitor = require('../../models/monitor');

// Configuration
const config = configService.getConfig();
const processorConfig = config.processorService;

// Local methods
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

// Local variables
const _isActiveFilter = { isActive: true };

// Export
var ProcessorService = function () {
    this.monitors = [];
    this.monitorProcessors = [];
    this._activeMonitorsIntervalId = null;
}

ProcessorService.prototype.start = function (onMonitorsLoaded) {
    _logToConsole('Process service started');
    
    this._activeMonitorsIntervalId = setInterval(() => {
        this.refreshActiveMonitors();
    }, processorConfig.checkActiveMonitorsInterval);
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
        if (!monitorProcessor.isRunning) {
            monitorProcessor.start();
        }
    });
}

ProcessorService.prototype.refreshActiveMonitors = function () {
    dataLoadService.monitor.getAll((data) => {
        this.handleRefreshRemoveMonitors(data);
        this.handleRefreshAddMonitors(data);
    }, null, null);
}

ProcessorService.prototype.handleRefreshRemoveMonitors = function (data) {
    // Retrieve any monitors that are no longer active
    const monitorsToRemove = _.filter(data, (m) => {
        return _.some(this.monitors, (monitor) => {
            const isInactive = m.isActive === false;
            const isFound = m._id.toString() === monitor._id.toString();
            
            return isInactive && isFound;
        });
    });
    
    if (monitorsToRemove && monitorsToRemove.length > 0) {
        // Log a message and remove the monitors
        console.log(`${monitorsToRemove.length} monitor(s) are no longer active. Stopping related monitor processors...`);
        this.removeMonitors(monitorsToRemove);
    }
}

ProcessorService.prototype.handleRefreshAddMonitors = function (data) {
    // Retrieve any monitors that need to be added to the processor interval
    const monitorsToAdd = _.filter(data, (m) => {
        const idExists = _.some(this.monitors, (monitor) => {
            return monitor._id.toString() === m._id.toString();
        });
        
        return m.isActive && !idExists;
    });

    if (monitorsToAdd && monitorsToAdd.length > 0) {
        // Log a message and add the monitors and monitor processors
        console.log(`${monitorsToAdd.length} new monitor(s) active. Adding monitors to processor interval...`);

        collectionUtility.forEachWithCallback(monitorsToAdd, (monitor) => {
            this.monitors.push(monitor);
        }, () => {
            _buildMonitorProcessors(monitorsToAdd, (monitorProcessors) => {
                collectionUtility.doForEach(monitorProcessors, (monitorProcessor) => {
                    this.monitorProcessors.push(monitorProcessor);
                    this.startMonitorProcessors();
                });
            });
        });
    }
}

ProcessorService.prototype.removeMonitors = function (monitorsToRemove) {
    // Stop and remove the individual monitor processor
    collectionUtility.doForEach(this.monitorProcessors, (processor) => {
        const idFound = _.some(monitorsToRemove, (m) => { return m._id.toString() === processor._monitor._id.toString(); });
        if (idFound) {    // Stop the individual monitor processor
            processor.stop();

            _.remove(this.monitorProcessors, (monitorProcessor) => {
                return monitorProcessor._monitor._id.toString() === processor._monitor._id.toString();
            });
        }
    });

    // Remove the monitor object
    collectionUtility.doForEach(monitorsToRemove, (monitorToRemove) => {
        _.remove(this.monitors, (monitor) => {
            return monitor._id.toString() === monitorToRemove._id.toString();
        });
    });
}

module.exports = ProcessorService;