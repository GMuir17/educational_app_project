const PubSub = require('./pub_sub.js');

const HeroImages = function (element) {
  this.element = element;
  this.images = [
    'agustinia-painting1.jpg',
    'amargasaurus-group-s1.jpg',
    'apatosaurus1.jpg',
    'carnotaurus-after-gasparinisaurs1.jpg',
    'diabloceratops-painting1.jpg',
    'diamantinasaurus_.jpg',
    'dimetrodon-painting1.jpg',
    'diplodocus1.jpg',
    'edmontonia1.jpg',
    'feathered-t-rex1.jpg',
    'iguanodon-herdpolacanthus1.jpg',
    'isisaurus-saturated1.jpg',
    'lambeosaurus1.jpg',
    'liopleurodon-painting1.jpg',
    'mamenchisaurus-huayangosaurus1.jpg',
    'olorotitan1.jpg',
    't-rex-vs-triceratops-s1.jpg',
    'therizinosaurus-oviraptors-sjpg1.jpg',
    'tropeognathus1.jpg'
  ];
};


HeroImages.prototype.showRandomImage = function () {
  const selectedIndex = this.selectRandom();
  console.log(selectedIndex);
  this.render(this.images[selectedIndex]);
};

HeroImages.prototype.selectRandom = function () {
  const index = Math.round(Math.random() * 19);
  return index
};

HeroImages.prototype.render = function (image) {
  this.element.setAttribute('src', `images/${image}`);
}

module.exports = HeroImages;
