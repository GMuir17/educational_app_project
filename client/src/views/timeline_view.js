const PubSub = require('../helpers/pub_sub.js');

const Timeline = function (timeline) {
  this.timeline = timeline;
}

Timeline.prototype.bindingEvents = function () {
  PubSub.subscribe('TimePeriod:all-periods-ready', (evt) => {
    const periods = evt.detail;

    render(periods, this.timeline);
  });
};

function render(periods, timeline) {
  let periodsMapped = getPeriods(periods);
  console.log('all periods names: ', periodsMapped);
  renderTimeline(periodsMapped, timeline)
}

function getPeriods(periods) {
  let periodNames = []
  periods.map((period) => {
    periodNames.push(period.nam);
  })
  return periodNames
}

module.exports = Timeline;
