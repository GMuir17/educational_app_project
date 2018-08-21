const PubSub = require('../helpers/pub_sub.js');
const DinosaurPreviewView = require('./dinosaur_preview_view.js');
const DietView = require('./diet_view.js');

const TimePeriodView = function (container) {
  this.container = container;
  this.mainContainer = null;
  this.periodDescription = null;
  this.nav = null;
};

TimePeriodView.prototype.bindEvents = function () {


  PubSub.subscribe('Wikipedia:period-data-ready', (evt) => {
    const periodDescription = evt.detail;
    console.log("break");
    this.mainContainer = this.createMain();
    this.container.appendChild(this.mainContainer);

    this.renderDescription(periodDescription);
  })

  PubSub.subscribe('Diet:all-diets-ready',(evt) => {
    const diets = evt.detail;
    this.renderDietTabs(diets);

  });

  PubSub.subscribe('Wikipedia:all-dinosaurs-ready', (evt) => {
    const lightbox = document.createElement('div')
    lightbox.classList = 'time-period-lightbox'
    console.log('lightbox happens');
    this.container.appendChild(lightbox)
    lightbox.addEventListener('click', () => {
      this.container.innerHTML = '';
    });
    console.log('creating dinosaurs?');
    const dinosaurs = evt.detail;
    this.render(dinosaurs);

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
  dinosaurs.forEach((dinosaur) => {
    const article = document.createElement('article');
    article.className = 'dinosaur-preview';
    const dinosaurPreviewView = new DinosaurPreviewView(article, dinosaur);
    dinosaurPreviewView.makeEventListener();
    dinosaurPreviewView.render()
    this.mainContainer.appendChild(article);
    article.addEventListener('click', this.createDinosaurViewOnClick);
  });
};

TimePeriodView.prototype.renderDescription = function (periodDescription) {

  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.classList.add("period-summary");
  const periodSentences = periodDescription.split(". ")
  descriptionParagraph.textContent = `${periodSentences[0]}. ${periodSentences[1]}. ${periodSentences[2]}.`;
  this.mainContainer.appendChild(descriptionParagraph);
};

TimePeriodView.prototype.createMain = function () {
  const timePeriodContainer = document.createElement('main');
  timePeriodContainer.id = "time-period-display";
  this.nav = document.createElement('nav');
  this.nav.id = "families";
  timePeriodContainer.appendChild(this.nav);
  return timePeriodContainer;
};

TimePeriodView.prototype.renderDietTabs = function (diets) {
  const dietView = new DietView(this.nav, diets);
  dietView.bindEvents();
  this.mainContainer.appendChild(this.nav);
};

module.exports = TimePeriodView;
