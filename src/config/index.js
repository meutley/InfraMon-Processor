module.exports = {
    getConfig: function (env) {
        return require('./config.' + env);
    }
}