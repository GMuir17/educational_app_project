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
  const lightbox = document.createElement('div')
  lightbox.classList = 'dinosaur-lightbox'
  lightbox.addEventListener('click', this.removeDinosaurViewOnClick);
  this.element.appendChild(lightbox)

  const dinosaurDiv = document.createElement('article');
  dinosaurDiv.id = "dinosaur-view";

  const infoPara = this.createInfoPara(dinosaur);
  dinosaurDiv.appendChild(infoPara);

  const dinosaurImage = this.createImage(dinosaur.imageURL);
  dinosaurDiv.appendChild(dinosaurImage)

  const factFile = this.createFactFile(dinosaur.facts);
  dinosaurDiv.appendChild(factFile);

  const mapContainer = this.createMapElement();
  dinosaurDiv.appendChild(mapContainer);

  this.element.appendChild(dinosaurDiv);
};

DinosaurView.prototype.removeDinosaurViewOnClick = function () {
  PubSub.publish('DinosaurPreviewView:exit-click');
  // this.container.removeEventListener('click', this.removeDinosaurViewOnClick);
};

DinosaurView.prototype.createInfoPara = function (dinosaur) {
  const section = document.createElement('section')
  section.id = 'info-para'
  const title = document.createElement('h2')
  title.textContent = `${dinosaur.name}`
  const paragraph = document.createElement('p')
  paragraph.textContent = `${dinosaur.description}`
  section.appendChild(title);
  section.appendChild(paragraph);
  return section;
};

DinosaurView.prototype.createImage = function (image) {
  const container = document.createElement('section');
  container.id = 'dinosaur-image-container';
  const dinosaurImage = document.createElement('img');
dinosaurImage.setAttribute('src', `${image}`);
dinosaurImage.id = 'dinosaur-image';
  container.appendChild(dinosaurImage);
  return container;
};

DinosaurView.prototype.createFactFile = function (facts) {
  const factFile = document.createElement('p');
  factFile.id = 'fact-file'
  factFile.textContent = `${facts}`;
  return factFile;
};

DinosaurView.prototype.createMapElement = function () {
  const div = document.createElement('div');
  div.id = 'map';
  return div;
};

DinosaurView.prototype.deleteSelf = function () {
  this.element.innerHTML = '';
};

module.exports = DinosaurView;
