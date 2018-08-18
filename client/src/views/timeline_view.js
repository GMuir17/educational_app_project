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
    listOfPeriods.appendChild(item);
    
    item.addEventListener('click', (evt) => {
      console.log('all periods in list: ', evt.target.value);
      const selectedPeriod = evt.target.value;
      PubSub.publish('TimelineMenu:selected-period', selectedPeriod);
      // TODO: remove this publish, it was just a 'seed'
      const selectedDino = {
        name: "BananaRex",
        description: "A very big banana",
        imageURL: "images/feathered-t-rex1.jpg"
      }
      const selectedDinosaurs = [selectedDino, selectedDino, selectedDino, selectedDino, selectedDino, selectedDino, selectedDino, selectedDino]
      PubSub.publish('FakeData:a-test', selectedDinosaurs);
    })
  })
  this.timeline.appendChild(listOfPeriods);
}

module.exports = Timeline;
