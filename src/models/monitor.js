var Monitor = function () {
    this._id = '';
    this.name = '';
    this.type = '';
    this.webRequestDetails = null;
    this.pingDetails = null;
    this.frequencyAmount = 0;
    this.frequencyPeriod = '';
    this.isActive = false;
}

module.exports = Monitor;