// DO NOT MODIFY
const baseConfig = require('./config');
var config = baseConfig;


/* ============================================
   
   Add/modify configuration values here

   Example:
       config.server.port = 9999;

   ============================================ */

config.database.server = 'mongodb://localhost';

config.processorService.startupRefreshInterval = 1000;
config.processorService.checkActiveMonitorsInterval = 5000;


// DO NOT MODIFY
module.exports = config;