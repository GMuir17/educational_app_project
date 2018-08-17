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
  // let periodsMapped = getPeriods(periods);

  renderTimeline(periods, timeline)
}

// function getPeriods(periods) {
//   let periodNames = []
//   periods.map((period) => {
//     periodNames.push(period.nam);
//   })
//   return periodNames
// }

function renderTimeline(periods, timeline) {
  const listOfPeriods = document.createElement('ul');
  periods.forEach((period, index) => {
    const item = document.createElement('li');
    item.textContent = period.nam;
    item.value = index;
    console.log('all periods in list: ', item.value);
    listOfPeriods.appendChild(item);
    item.addEventListener('click', (evt) => {
      console.log(evt);
      PubSub.publish('TimelineMenu:selecte-period', evt);
    })
  })
  timeline.appendChild(listOfPeriods);
}

module.exports = Timeline;
