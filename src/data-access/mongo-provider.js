const ObjectID = require('mongodb').ObjectID;

const _get = function (db, collectionName) {
    return {
        insertOne: function (model, success, failure) {
            try {
                db.collection(collectionName)
                    .insertOne(model)
                    .then((result) => {
                        if (typeof success === 'function') {
                            success(model);
                        }
                    });
            } catch (ex) {
                if (typeof failure === 'function') {
                    failure(ex);
                }
            }
        },
        
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