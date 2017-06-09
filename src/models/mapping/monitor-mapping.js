const webRequestDetailsMapping = require('./web-request-details-mapping');
const pingDetailsMapping = require('./ping-details-mapping');

const Monitor = require('../monitor');

module.exports = {
    fromEntity: function (entity) {
        var model = new Monitor();
        model._id = entity._id;
        model.name = entity.name;
        model.type = entity.type;
        
        model.webRequestDetails =
            model.webRequestDetails
            ? webRequestMapping.fromEntity(model.webRequestDetails)
            : null;

        model.pingDetails =
            entity.pingDetails
            ? pingDetailsMapping.fromEntity(model.pingDetails)
            : null;

        model.frequencyAmount = entity.frequencyAmount;
        model.frequencyPeriod = entity.frequencyPeriod;
        model.isActive = entity.isActive;

        return model;
    }
}