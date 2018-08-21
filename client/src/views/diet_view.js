const PubSub = require('../helpers/pub_sub.js');

const DietView = function (tags, diets) {
  this.tags = tags;
  this.diets = diets;
}

DietView.prototype.bindEvents = function () {
  this.tags.innerHTML = '';

PubSub.subscribe('Wikipedia:all-dinosaurs-ready', () => {
  this.renderTags(this.diets);

});
};


DietView.prototype.renderTags = function () {
  const tagsList = document.createElement('ul');
  const all = document.createElement('li');
  all.textContent = 'Info';
  all.value = -1;
  all.addEventListener('click', (evt) => {
    PubSub.publish('DietView:selected-diet', all.value);
  })
  tagsList.appendChild(all);

  this.diets.forEach((diet, index) => {
    if(diet === 'carnivore' || diet === 'herbivore' || diet === 'omnivore') {
      const item = document.createElement('li');
      item.textContent = diet;
      item.value = index;
      tagsList.appendChild(item);

      item.addEventListener('click', (evt) => {
        PubSub.publish('DietView:selected-diet', item.value);
      })
    }
  })
  this.tags.appendChild(tagsList);
};

module.exports = DietView;
