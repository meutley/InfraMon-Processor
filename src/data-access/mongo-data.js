const MongoClient = require('mongodb').MongoClient;
const config = require('../services/config-service').getConfig();

const _doWithConnection = function (action) {
    if (typeof action === 'function') {
        MongoClient.connect(config.database.server, (err, db) => {
            action(db);
        });
    }
}

module.exports = {
    doWithConnection: _doWithConnection
};