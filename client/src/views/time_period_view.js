const PubSub = require('../helpers/pub_sub.js');
const DinosaurPreviewView = require('./dinosaur_preview_view.js');

const TimePeriodView = function (container) {
  this.container = container;
};

TimePeriodView.prototype.bindEvents = function () {
  // TODO: make sure this channel matches with the wiki view
  PubSub.subscribe('Wikipedia:wiki-data-ready', (evt) => {
    console.log('timeperiodview:', "Hiya");
    const dinosaurs = evt.detail;
    this.render(dinosaurs);
  });
};

TimePeriodView.prototype.render = function (dinosaurs) {
  this.container.innerHTML = '';

  this.renderDescription(dinosaurs.period)

  dinosaurs.forEach((dinosaur) => {
    const dinosaurPreviewView = new DinosaurPreviewView(this.container, dinosaur);
    dinosaurPreviewView.render()
  });
};

TimePeriodView.prototype.renderDescription = function (periodDescription) {
  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.classList = "period-summary";
  descriptionParagraph.textContent = periodDescription;
};

module.exports = TimePeriodView;
