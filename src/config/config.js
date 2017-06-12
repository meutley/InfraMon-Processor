module.exports = {
    server: {
        port: 4200
    },

    database: {
        server: 'mongodb://localhost'
    },

    processorService: {
        startupRefreshInterval:      2000,            // 2 seconds
        checkActiveMonitorsInterval: 5 * 60 * 1000    // 5 minutes
    }
}