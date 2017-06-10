module.exports = {
    toNewModel: function (model) {
        return {
            monitorId: model.monitorId,
            result: model.result
        };
    }
}