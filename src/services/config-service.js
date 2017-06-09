const _env = process.env.NODE_ENV || 'debug';

// Configuration
const _cfg = require('../config');
const _config = _cfg.getConfig(_env);

module.exports = {
    getConfig: function () {
        return _config;
    }
}