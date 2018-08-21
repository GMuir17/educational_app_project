const PubSub = require('../helpers/pub_sub.js');

const DinosaurPreviewView = function (container, dinosaur) {
  this.container = container;
  this.dinosaur = dinosaur;
};

DinosaurPreviewView.prototype.render = function () {
  const previewImage = this.createImage();
  this.container.appendChild(previewImage);

  const previewTitle = this.createTitle();
  this.container.appendChild(previewTitle);

  const previewDescription = this.createDescription();
  this.container.appendChild(previewDescription);
};

DinosaurPreviewView.prototype.createTitle = function () {
  const title = document.createElement('h4');
  title.classList.add("preview-title");
  title.textContent = this.dinosaur.name;
  return title;
};

DinosaurPreviewView.prototype.createDescription = function () {
  const description = document.createElement('p');
  description.classList.add("preview-description");

  if (this.dinosaur.description === undefined) {
    description.textContent = "No description available from Wikipedia."
  }
  else {
    const dinosaurDescription = this.dinosaur.description.split(". ")
    description.textContent = `${dinosaurDescription[0]}.`;
  }
  return description;
};

DinosaurPreviewView.prototype.createImage = function () {
  const image = document.createElement('img');
  image.classList.add("preview-image");
  image.src = this.dinosaur.image;
  image.alt = this.dinosaur.name;
  return image;
};

DinosaurPreviewView.prototype.makeEventListener = function () {
  this.container.addEventListener('click', (evt) => {
    const selectedDinosaur = this.dinosaur;
    PubSub.publish('DinosaurPreviewView:selected-dinosaur', selectedDinosaur);
  });
};

DinosaurPreviewView.prototype.deleteSelf = function () {
  this.container.innerHTML = '';
};


module.exports = DinosaurPreviewView;
