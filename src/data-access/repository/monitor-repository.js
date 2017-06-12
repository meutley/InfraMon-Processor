const dataUtility = require('../mongo-data');
const dataProvider = require('../mongo-provider');

const _callbackWithData = function (action, data) {
    if (typeof action === 'function') {
        action(data);
    }
}

const _getAll = function (success, failure, filter) {
    try {
        dataUtility.doWithConnection((db) => {
            dataProvider.get(db, 'monitors')
                .getAll((data) => {
                    _callbackWithData(success, data);
                }, (err) => {
                    _callbackWithData(failure, err);
                }, filter);

            db.close();
        });
    } catch (ex) {
        _callbackWithData(failure, ex);
    }
}

module.exports = {
    getAll: _getAll
}