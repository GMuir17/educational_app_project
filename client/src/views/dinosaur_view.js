const PubSub = require('../helpers/pub_sub.js');

const DinosaurView = function (element) {
  this.element = element;
}

DinosaurView.prototype.bindEvents = function () {
  PubSub.subscribe ('DinosaurPreviewView:selected-dinosaur', (evt) => {
    const dinosaur = evt.detail;
    this.render(dinosaur);
  });
  PubSub.subscribe('DinosaurPreviewView:exit-click', () => {
    this.deleteSelf();
  });
}

DinosaurView.prototype.render = function (dinosaur) {
  this.element.innerHTML = '';
  this.preRender(dinosaur, this.element);
  PubSub.publish('DinosaurView:MapContainerReady', dinosaur);
};

DinosaurView.prototype.preRender = function (dinosaur, element) {
  const lightbox = document.createElement('div')
  lightbox.classList = 'dinosaur-lightbox'
  lightbox.addEventListener('click', this.removeDinosaurViewOnClick);
  this.element.appendChild(lightbox);
  const otherLightbox = document.querySelector('.time-period-lightbox');
  otherLightbox.classList = 'disabled-lightbox';

  const dinosaurDiv = document.createElement('article');
  dinosaurDiv.id = "dinosaur-view";

  const infoPara = this.createInfoPara(dinosaur);
  dinosaurDiv.appendChild(infoPara);

  const dinosaurImage = this.createImage(dinosaur);
  dinosaurDiv.appendChild(dinosaurImage)

  const factFile = this.createFactFile(dinosaur);
  dinosaurDiv.appendChild(factFile);

  const mapContainer = this.createMapElement(dinosaur);
  dinosaurDiv.appendChild(mapContainer);

  element.appendChild(dinosaurDiv);
};

DinosaurView.prototype.removeDinosaurViewOnClick = function () {
  PubSub.publish('DinosaurPreviewView:exit-click');
};

DinosaurView.prototype.createInfoPara = function (dinosaur) {
  const section = document.createElement('section')
  section.id = 'info-para'
  const title = document.createElement('h2')
  title.textContent = `${dinosaur.name}`
  const paragraph = document.createElement('p')

  const splitDescription = this.splitDescription(dinosaur.description);
  paragraph.textContent = `${splitDescription[0]}`
  section.appendChild(title);
  section.appendChild(paragraph);
  return section;
};

DinosaurView.prototype.createImage = function (dinosaur) {
  const container = document.createElement('section');
  container.id = 'dinosaur-image-container';
  const image = document.createElement('img');
  image.id = 'dinosaur-image';
  image.src = dinosaur.image;
  image.alt = dinosaur.name;
  container.appendChild(image);
  return container;
};

DinosaurView.prototype.createFactFile = function (dinosaur) {
  const factFile = document.createElement('p');
  factFile.id = 'fact-file'
  const splitDescription = this.splitDescription(dinosaur.description);
  const secondParagraph = `${splitDescription[1]}`;

  if (splitDescription.length === 1) {
    factFile.textContent = "Unfortunately, fossil records for many dinosaurs are incomplete or rare; This can mean that whilst the Paleobiology database has a record of the suspected species, wikipedia is yet to make a record of rarer dinosaur. If more data is avaliable, this page will be updated."
  }
  else {
    const splitDescriptionSentences = secondParagraph.split(". ");
    factFile.textContent = `${splitDescriptionSentences[0]}. ${splitDescriptionSentences[1]}.`
  }
  return factFile;
};

DinosaurView.prototype.createMapElement = function () {
  const div = document.createElement('div');
  div.id = 'map';
  return div;
};

DinosaurView.prototype.deleteSelf = function () {
  this.element.innerHTML = '';
  const otherLightbox = document.querySelector('.disabled-lightbox');
  otherLightbox.classList = 'time-period-lightbox';
};

DinosaurView.prototype.splitDescription = function (text) {
  if (text === undefined) {
    return ["No description available from Wikipedia.", "Unfortunately, fossil records for many dinosaurs are incomplete or rare; This can mean that whilst the Paleobiology database has a record of the suspected species, wikipedia is yet to make a record of rarer dinosaur. If more data is avaliable, this page will be updated."]
  }
  else {
    return text.split('\n');
  }
};

module.exports = DinosaurView;
