const frequencyPeriods = require('../models/frequency-periods');

module.exports = {
    getMillisecondsFromMonitorFrequency: function (frequencyAmount, frequencyPeriod) {
        switch (frequencyPeriod) {
            case frequencyPeriods.SECONDS:
                return frequencyAmount * 1000;
            case frequencyPeriods.MINUTES:
                return frequencyAmount * 60 * 1000;
            case frequencyPeriods.HOURS:
                return frequencyAmount * 60 * 60 * 1000;
            default:
                return -1;
        }
    }
}