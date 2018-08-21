const PubSub = require('../helpers/pub_sub.js');
const DinosaurPreviewView = require('./dinosaur_preview_view.js');
const DietView = require('./diet_view.js');

const TimePeriodView = function (container) {
  this.container = container;
  this.mainContainer = null;
  this.periodDescription = null;
};

TimePeriodView.prototype.bindEvents = function () {

  PubSub.subscribe('Wikipedia:period-data-ready', (evt) => {
    this.periodDescription = evt.detail;
  })

  // TODO: make sure this channel matches with the wiki view
  PubSub.subscribe('Wikipedia:all-dinosaurs-ready', (evt) => {
    this.container.innerHTML = '';

    const lightbox = document.createElement('div')
    lightbox.classList = 'time-period-lightbox'
    this.container.appendChild(lightbox)
    lightbox.addEventListener('click', () => {
      this.container.innerHTML = '';
    });

    this.mainContainer = this.createMain();
    this.container.appendChild(this.mainContainer);

    const dinosaurs = evt.detail;
    this.render(dinosaurs);

    PubSub.subscribe('Diet:all-diets-ready',(evt) => {
      const diets = evt.detail;
      this.renderDietTabs(diets);
    });
  });
};

TimePeriodView.prototype.removeTimePeriodViewOnClick = function () {
  PubSub.publish('TimePeriodView:exit-click');
};

TimePeriodView.prototype.createDinosaurViewOnClick = function (evt) {
  const selectedDino = evt.target.value;
  PubSub.publish('TimePeriodView:dinosaur-selected', selectedDino);
};

TimePeriodView.prototype.render = function (dinosaurs) {
  this.renderDescription();
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

TimePeriodView.prototype.renderDescription = function () {

  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.classList.add("period-summary");
  descriptionParagraph.textContent = this.periodDescription;
  this.mainContainer.appendChild(descriptionParagraph);
};

TimePeriodView.prototype.createMain = function () {
  const timePeriodContainer = document.createElement('main');
  timePeriodContainer.id = "time-period-display";
  const nav = document.createElement('nav');
  nav.id = "families";
  timePeriodContainer.appendChild(nav);
  return timePeriodContainer;
};

TimePeriodView.prototype.renderDietTabs = function (diets) {
  const dietNav = document.querySelector('#families')

  const dietView = new DietView(dietNav, diets);
  dietView.bindEvents();
};

module.exports = TimePeriodView;
