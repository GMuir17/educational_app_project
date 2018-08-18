const PubSub = require('../helpers/pub_sub.js');

const DinosaurView = function (element) {
  this.element = element;
}

const selectedDino = {
  name: "BananaRex",
  description: "A very big banana",
  imageURL: "images/feathered-t-rex1.jpg"
}

DinosaurView.prototype.bindEvents = function () {
  PubSub.subscribe(('', evt) => {
    this.render(evt.detail);
  })
}

DinosaurView.prototype.render = function (dinosaur) {
  const dinosaurDiv = document.createElement('article');
  dinosaurDiv.id = "dinosaur-view";

  const infoPara = DinosaurView.createInfoPara(dinosaur);
  dinosaurDiv.appendChild(infoPara);

  const dinosaurImage = DinosaurView.createImage(dinosaur.imageURL);
  dinosaurDiv.appendChild(dinosaurImage)

  const factFile = DinosaurView.createFactFile(dinosaur.facts);
  dinosaurDiv.appendChild(factFile);

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
};

DinosaurView.prototype.createImage = function (image) {
  const container = document.createElement('section');
  container.id = 'dinosaur-image-container';
  const image = document.createElement('img');
  

};


module.exports = dinosaurView;
