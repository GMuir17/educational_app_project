const PubSub = require('../helpers/pub_sub.js');
const DinosaurPreviewView = require('./dinosaur_preview_view.js');
const DietView = require('./diet_view.js');

const TimePeriodView = function (container) {
  this.container = container;
  this.mainContainer = null;
  this.periodDescription = null;
  // this.createDinosaurViewOnClick = this.createDinosaurViewOnClick.bind(this);
  // this.removeDinosaurViewOnClick = this.removeDinosaurViewOnClick.bind(this);
};

TimePeriodView.prototype.bindEvents = function () {

  PubSub.subscribe('Wikipedia:period-data-ready', (evt) => {
     this.periodDescription = evt.detail;
    console.log(evt.detail);
    // this.renderDescription(periodDescription);
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
  // });
  //
  // PubSub.subscribe('Wikipedia:all-dinosaurs-ready', (evt) => {
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

  this.renderDescription()

  const summaryList = document.createElement('li');
  nav.appendChild(summaryList);

  const listItem = document.createElement('ul');
  listItem.textContent = "All Dinos";
  summaryList.appendChild(listItem);
  // TODO: eventually pass this the dinosaurs.period
};

TimePeriodView.prototype.renderDescription = function () {
  console.log(this.periodDescription);
  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.classList.add("period-summary");
  descriptionParagraph.textContent = this.periodDescription;
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
