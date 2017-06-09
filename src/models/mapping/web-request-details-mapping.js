const WebRequestDetails = require('../web-request-details');

module.exports = {
    fromEntity: function (entity) {
        var model = new WebRequestDetails();
        model.url = entity.url;
        model.method = entity.method;
        model.expectedResponseStatusCode = entity.expectedResponseStatusCode;

        return model;
    }
}