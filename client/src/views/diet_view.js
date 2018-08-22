const PubSub = require('../helpers/pub_sub.js');

const DietView = function (tags, diets) {
  this.tags = tags;
  this.diets = diets;
}

DietView.prototype.bindEvents = function () {
  this.tags.innerHTML = '';

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
      item.textContent = this.capitalizeFirstLetter(diet);
      item.value = index;
      tagsList.appendChild(item);

      item.addEventListener('click', (evt) => {
        const previews = document.querySelectorAll('.dinosaur-preview');
        previews.forEach((preview, index) => {
          preview.parentNode.removeChild(preview);
        })
        PubSub.publish('DietView:selected-diet', item.value);
        console.log("SELECTED DIET: ", item.value);
      })
    }
  })
  this.tags.appendChild(tagsList);
};

DietView.prototype.capitalizeFirstLetter = function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
};

module.exports = DietView;
