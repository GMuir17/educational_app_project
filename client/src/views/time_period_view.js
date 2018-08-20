const PubSub = require('../helpers/pub_sub.js');
const DinosaurPreviewView = require('./dinosaur_preview_view.js');
const DietView = require('./diet_view.js');

const TimePeriodView = function (container) {
  this.container = container;
  this.mainContainer = null;
};

TimePeriodView.prototype.bindEvents = function () {
  // TODO: make sure this channel matches with the wiki view
  PubSub.subscribe('FakeData:a-test', (evt) => {
    this.container.innerHTML = '';

    this.mainContainer = this.createMain();
    this.container.appendChild(this.mainContainer);

    const dinosaurs = evt.detail;
    this.render(dinosaurs);
  });

  this.container.addEventListener('click', (evt) => {
    const selectedDino = evt.target.value;
    PubSub.publish('TimePeriodView:dinosaur-selected', selectedDino);
    this.container.addEventListener('click', () => {
      PubSub.publish('DinosaurPreviewView:exit-click');
    });
  });

};

  TimePeriodView.prototype.render = function (dinosaurs) {
    this.renderContainer(dinosaurs)

    dinosaurs.forEach((dinosaur) => {
      // TODO: should I use "article.dinosaur-preview" here?
      const article = document.createElement('article');
      article.classList.add("dinosaur-preview");
      const dinosaurPreviewView = new DinosaurPreviewView(article, dinosaur);
      dinosaurPreviewView.makeEventListener();
      dinosaurPreviewView.render()
      this.mainContainer.appendChild(article);
    });
  };

  TimePeriodView.prototype.renderContainer = function (dinosaurs) {
    const nav = document.createElement('nav');
    nav.id = "families";
    this.mainContainer.appendChild(nav);

  this.renderDietTabs(nav);

  const summaryList = document.createElement('li');
  nav.appendChild(summaryList);

    const listItem = document.createElement('ul');
    listItem.textContent = "All Dinos";
    summaryList.appendChild(listItem);
    // TODO: eventually pass this the dinosaurs.period
    this.renderDescription(dinosaurs)
  };

  TimePeriodView.prototype.renderDescription = function (periodDescription) {
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.classList.add("period-summary");
    descriptionParagraph.textContent = "Imagine a T-Rex trying to type quickly";
    this.mainContainer.appendChild(descriptionParagraph);
  };

  TimePeriodView.prototype.createMain = function () {
    const timePeriodContainer = document.createElement('main');
    timePeriodContainer.id = "time-period-display";
    return timePeriodContainer;
  };

TimePeriodView.prototype.renderDietTabs = function (element) {
  const dietView = new DietView(element);
  dietView.bindEvents();
};

module.exports = TimePeriodView;
