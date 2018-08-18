const PubSub = require('../helpers/pub_sub.js');

const DietView = function (tags) {
  this.tags = tags
}

DietView.prototype.bindingEvents = function () {
  PubSub.subscribe('Dinosaur:all-dinosaurs-ready', (evt) => {
    const dinosaurs = evt.detail;
    const UniqueDiets = getUniqueDiets(dinosaurs);
    // this.renderTags(dinosaurs);
  })
};

function getUniqueDiets(dinosaurs) {
  const filteredDiets = dinosaurs.reduce((uniqueDiets, dinosaur, index) => {
    const dietIsUnique = !uniqueDiets.some((uniqueDiet) => {
      return uniqueDiet === dinosaur.diet;
    })

    console.log('asdfasdfh:', dietIsUnique);
    if (dietIsUnique) {
      uniqueDiets.push(dinosaur.diet)
    }
    return uniqueDiets
  }, []);
  console.log(filteredDiets);
  return filteredDiets;
}

// DietView.prototype.renderTags = function (dinosaurs) {
//   const tagsList = document.createElement('ul');
//     const all = document.createElement('li');
//     all.textContent = dinosaurs[0].period;
//     all.value = -1;
//   tagsList.appendChild(all);
//   dinosaurs.forEach((dinosaur) => {
//     const item = document.createElement('li');
//     item.textContent
//   })

// };
module.exports = DietView;
