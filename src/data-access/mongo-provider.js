const ObjectID = require('mongodb').ObjectID;

const _get = function (db, collectionName) {
    return {
        getById: function (id, success, failure) {
            try {
                db.collection(collectionName)
                    .findOne({ _id: new ObjectID(id) }, (err, res) => {
                        if (err && typeof failure === 'function') {
                            failure(err);
                        } else if (!err && typeof success === 'function') {
                            success(res);
                        }
                    });
            } catch (ex) {
                if (typeof failure === 'function') {
                    failure(ex);
                }
            }
        },

        getAll: function (success, failure) {
            try {
                db.collection(collectionName)
                    .find({}).toArray((err, res) => {
                        if (err && typeof failure === 'function') {
                            failure(err);
                        } else if (!err) {
                            success(res);
                        }
                    });
            } catch (ex) {
                if (typeof failure === 'function') {
                    failure(ex);
                }
            }
        }
    };
}

module.exports = {
    get: _get
}