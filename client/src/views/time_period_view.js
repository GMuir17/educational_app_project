const PubSub = require('../helpers/pub_sub.js');
// require dinosaur_preview_view

const TimePeriodView = function (container) {
  this.container = container;
};

TimePeriodView.prototype.bindEvents = function () {
  // TODO: make sure this channel matches with the wiki view
  PubSub.subscribe('Wikipedia:wiki-data-ready', (evt) => {
    console.log('timeperiodview:', "Hiya");
    const dinosaurData = evt.detail;
    this.render(dinosaurData);
  });
};

TimePeriodView.prototype.render = function (dinosaurData) {
  console.log('render', "Hey there");
};

module.exports = TimePeriodView;
