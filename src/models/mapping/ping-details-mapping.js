const PingDetails = require('../ping-details');

module.exports = {
    fromEntity: function (entity) {
        var model = new PingDetails();

        return model;
    }
}