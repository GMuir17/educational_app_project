const PubSub = require('../helpers/pub_sub.js');

const TimeLine = function (timeline) {
  this.timeline = timeline;
}

TimeLine.prototype.bindingEvents = function () {
  PubSub.subscribe('TimePeriod:all-periods-ready', (evt) => {
    const periods = evt.detail;
    console.log(periods);
  });
};

module.exports = TimeLine;
