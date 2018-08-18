const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const TimePeriod = function () {
  this.url = 'https://paleobiodb.org/data1.2/intervals/list.json?min_ma=65&max_ma=250&scale_level=4';
  this.request = new RequestHelper(this.url);
  this.timelapse = null;
}

TimePeriod.prototype.bindingEvents = function () {
  PubSub.subscribe('TimelineMenu:selected-period', (evt) => {
    selectedPeriod = this.timelapse[evt.detail];
    const periodReady = {
      periodName: selectedPeriod.nam,
      earlyDate: Math.ceil(selectedPeriod.eag),
      lateDate: Math.ceil(selectedPeriod.lag)
    }
    PubSub.publish('Timeline:selected-period-ready', periodReady);
  })
};

TimePeriod.prototype.get = function () {
  this.request.get()
    .then((periods) => {
      this.timelapse = periods.records;
      PubSub.publish('TimePeriod:all-periods-ready', periods.records);
    })
    .catch((err) => {
      console.error(err);
    })
}

module.exports = TimePeriod;
