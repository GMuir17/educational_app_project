const PubSub = require('../helpers/pub_sub.js');
const DinosaurPreviewView = require('./dinosaur_preview_view.js');
const DietView = require('./diet_view.js');

const TimePeriodView = function (container) {
  this.container = container;
  this.mainContainer = null;
  this.periodDescription = null;
  this.nav = null;
  // this.createDinosaurViewOnClick = this.createDinosaurViewOnClick.bind(this);
  // this.removeDinosaurViewOnClick = this.removeDinosaurViewOnClick.bind(this);
};

TimePeriodView.prototype.bindEvents = function () {


  PubSub.subscribe('Wikipedia:period-data-ready', (event) => {
    const periodDescription = event.detail;
    console.log("break");
    this.mainContainer = this.createMain();
    this.container.appendChild(this.mainContainer);

    this.renderDescription(periodDescription);
  })

  PubSub.subscribe('Diet:all-diets-ready',(evt) => {
    const diets = evt.detail;
    console.log(diets);


    this.renderDietTabs(diets);

  });


//   // TODO: make sure this channel matches with the wiki view
//   PubSub.subscribe('Wikipedia:all-dinosaurs-ready', (evt) => {
//     this.container.innerHTML = '';
//
//     const lightbox = document.createElement('div')
//     lightbox.classList = 'time-period-lightbox'
//     this.container.appendChild(lightbox)
//     lightbox.addEventListener('click', () => {
//       this.container.innerHTML = '';
//     });
//
//     // this.mainContainer = this.createMain();
//     // this.container.appendChild(this.mainContainer);
//
    // const dinosaurs = null;
    // this.render();
//
//
//   });
};
//
// TimePeriodView.prototype.removeTimePeriodViewOnClick = function () {
//   PubSub.publish('TimePeriodView:exit-click');
// };
//
// TimePeriodView.prototype.createDinosaurViewOnClick = function (evt) {
//   const selectedDino = evt.target.value;
//   PubSub.publish('TimePeriodView:dinosaur-selected', selectedDino);
// };

// TimePeriodView.prototype.render = function (dinosaurs) {
//   this.renderDescription();
// //   dinosaurs.forEach((dinosaur) => {
// //     // TODO: should I use "article.dinosaur-preview" here?
// //     const article = document.createElement('article');
// //     article.classList.add("dinosaur-preview");
// //     const dinosaurPreviewView = new DinosaurPreviewView(article, dinosaur);
// //     dinosaurPreviewView.makeEventListener();
// //     dinosaurPreviewView.render()
// //     this.mainContainer.appendChild(article);
// //     article.addEventListener('click', this.createDinosaurViewOnClick);
// //   });
// };

TimePeriodView.prototype.renderDescription = function (periodDescription) {

  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.classList.add("period-summary");
  descriptionParagraph.textContent = periodDescription;
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

  // this.nav.innerHTML = '';
  const dietView = new DietView(this.nav, diets);
  dietView.bindEvents();
  this.mainContainer.appendChild(this.nav);
};

module.exports = TimePeriodView;
