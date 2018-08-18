const PubSub = require('../helpers/pub_sub.js');
const DinosaurPreviewView = require('./dinosaur_preview_view.js');

const TimePeriodView = function (container) {
  this.container = container;
};

TimePeriodView.prototype.bindEvents = function () {
  // TODO: make sure this channel matches with the wiki view
  PubSub.subscribe('FakeData:a-test', (evt) => {
    console.log('timeperiodview:', evt.detail);
    const dinosaurs = evt.detail;
    this.render(dinosaurs);
  });
};

TimePeriodView.prototype.render = function (dinosaurs) {
  this.renderContainer(dinosaurs)

  dinosaurs.forEach((dinosaur) => {
    // TODO: should I use "article.dinosaur-preview" here?
    const article = document.createElement('article');
    article.classList.add("dinosaur-preview");
    console.log("render", article);
    const dinosaurPreviewView = new DinosaurPreviewView(article, dinosaur);
    dinosaurPreviewView.render()
  });
};

TimePeriodView.prototype.renderContainer = function (dinosaurs) {
  const nav = document.createElement('nav');
  nav.id = "families";
  this.container.appendChild(nav);

  const summaryList = document.createElement('li');
  nav.appendChild(summaryList);

  const listItem = document.createElement('ul');
  listItem.textContent = "Summary";
  summaryList.appendChild(listItem);

  // TODO: eventually pass this the dinosaurs.period
  this.renderDescription(dinosaurs)
};

TimePeriodView.prototype.renderDescription = function (periodDescription) {
  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.classList.add("period-summary");
  descriptionParagraph.textContent = "Imagine a T-Rex trying to type quickly";
};

module.exports = TimePeriodView;
