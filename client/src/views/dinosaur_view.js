const PubSub = require('../helpers/pub_sub.js');

const DinosaurView = function (element) {
  this.element = element;
}

DinosaurView.prototype.bindEvents = function () {
  PubSub.subscribe ('DinosaurPreviewView:selected-dinosaur', (evt) => {
    const dinosaur = evt.detail;
    console.log(dinosaur);
    this.render(dinosaur);
  });
}

DinosaurView.prototype.render = function (dinosaur) {
<<<<<<< HEAD
  this.element.innerHTML = '';
=======
  this.element.innerHTML = ''
>>>>>>> 792793d298857570c5d1f942366145c41700d8ad

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

module.exports = DinosaurView;
