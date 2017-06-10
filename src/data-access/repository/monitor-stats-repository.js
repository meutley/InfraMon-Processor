const dataUtility = require('../mongo-data');
const dataProvider = require('../mongo-provider');
const ObjectID = require('mongodb').ObjectID;

const webRequestResultMapping = require('../../models/mapping').webRequestResult;

const _callbackWithData = function (action, data) {
    if (typeof action === 'function') {
        action(data);
    }
}

const _addWebRequestResult = function (monitorId, result, success, failure) {
    const model = webRequestResultMapping.toNewModel({
        monitorId: new ObjectID(monitorId),
        result: result
    });
    
    try {
        dataUtility.doWithConnection((db) => {
            dataProvider.get(db, 'webrequestresults')
                .insertOne(model, (data) => {
                    _callbackWithData(success, data);
                }, (err) => {
                    _callbackWithData(failure, err);
                });

            db.close();
        });
    } catch (ex) {
        _callbackWithData(failure, ex);
    }
}

module.exports = {
    addWebRequestResult: _addWebRequestResult
}