const PubSub = require('../helpers/pub_sub.js');

const Timeline = function (timeline) {
  this.timeline = timeline;
}

Timeline.prototype.bindingEvents = function () {
  PubSub.subscribe('TimePeriod:all-periods-ready', (evt) => {
    const periods = evt.detail;
    this.renderTimeline(periods);
  });
};

Timeline.prototype.renderTimeline = function (periods)  {
  const listOfPeriods = document.createElement('ul');
  listOfPeriods.id = "timeline-list"
  periods.forEach((period, index) => {
    const item = document.createElement('li');
    item.textContent = period.nam;
    item.value = index;
    item.classList = "time-period"
    console.log('all periods in list: ', item.value);
    listOfPeriods.appendChild(item);
    item.addEventListener('click', (evt) => {
      const selectedPeriod = evt.target.value;
      PubSub.publish('TimelineMenu:selected-period', selectedPeriod);
    })
  })
  this.timeline.appendChild(listOfPeriods);
}

module.exports = Timeline;
