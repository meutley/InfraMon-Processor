const monitorRepository = require('../../data-access/repository/monitor-repository');

const _getAll = function (success, failure, filter) {
    const _filter = filter || {};
    return monitorRepository.getAll(success, failure, _filter);
}

module.exports = {
    getAll: _getAll
}