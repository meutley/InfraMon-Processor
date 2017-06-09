const monitorRepository = require('../../data-access/repository/monitor-repository');

const _getAll = function (success, failure) {
    return monitorRepository.getAll(success, failure);
}

module.exports = {
    getAll: _getAll
}