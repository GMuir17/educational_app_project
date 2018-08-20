const PubSub = require('../helpers/pub_sub.js');
const DinosaurPreviewView = require('./dinosaur_preview_view.js');
const DietView = require('./diet_view.js');

const TimePeriodView = function (container) {
  this.container = container;
  this.mainContainer = null;
  // this.createDinosaurViewOnClick = this.createDinosaurViewOnClick.bind(this);
  // this.removeDinosaurViewOnClick = this.removeDinosaurViewOnClick.bind(this);
};

TimePeriodView.prototype.bindEvents = function () {
  // TODO: make sure this channel matches with the wiki view
  PubSub.subscribe('FakeData:a-test', (evt) => {
    this.container.innerHTML = '';
    const lightbox = document.createElement('div')
    lightbox.classList = 'time-period-lightbox'
    this.container.appendChild(lightbox)
    // lightbox.addEventListener('click', this.removeDinosaurViewOnClick);


    this.mainContainer = this.createMain();
    // TODO:
    // this.mainContainer.addEventListener('click', this.removeDinosaurViewOnClick);
    this.container.appendChild(this.mainContainer);

    const dinosaurs = evt.detail;
    this.render(dinosaurs);
  });
};

TimePeriodView.prototype.createDinosaurViewOnClick = function (evt) {
  const selectedDino = evt.target.value;
  PubSub.publish('TimePeriodView:dinosaur-selected', selectedDino);
  // this.container.removeEventListener('click', this.createDinosaurViewOnClick);
};

// TimePeriodView.prototype.removeDinosaurViewOnClick = function () {
//   PubSub.publish('DinosaurPreviewView:exit-click');
//   this.container.removeEventListener('click', this.removeDinosaurViewOnClick);
// };

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
    article.addEventListener('click', this.createDinosaurViewOnClick);
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
