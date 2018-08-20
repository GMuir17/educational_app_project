const PubSub = require('../helpers/pub_sub.js');

const DietView = function (tags) {
  this.tags = tags;
}

DietView.prototype.bindEvents = function () {
  PubSub.subscribe('Diet:all-diets-ready', (evt) => {
    const diets = evt.detail;
    console.log("TAGS", this.tags);
    this.tags.innerHTML = '';
    this.renderTags(diets);
  })
};

DietView.prototype.renderTags = function (diets) {
  const tagsList = document.createElement('ul');
    const all = document.createElement('li');
    all.textContent = 'Info';
    all.value = -1;
    all.addEventListener('click', (evt) => {
      PubSub.publish('DietView:selected-diet', all.value);
    })
  tagsList.appendChild(all);

  diets.forEach((diet, index) => {
    if(diet === 'carnivore' || diet === 'herbivore' || diet === 'omnivore') {
      const item = document.createElement('li');
      item.textContent = this.capitaliseFirstLetter(diet);
      item.value = index;
      tagsList.appendChild(item);

      item.addEventListener('click', (evt) => {
        PubSub.publish('DietView:selected-diet', item.value);
      })
    }
  })
  this.tags.appendChild(tagsList);
};

DietView.prototype.capitaliseFirstLetter = function (word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

module.exports = DietView;
