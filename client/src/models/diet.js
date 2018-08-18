const PubSub = require('../helpers/pub_sub.js');

const Diet = function () {
  this.dinosaurs = null;
}

Diet.prototype.bindingEvents = function () {
  PubSub.subscribe('Dinosaur:all-dinosaurs-ready', (evt) => {
    const dinosaurs = evt.detail;
    const UniqueDiets = getUniqueDiets(dinosaurs);
    PubSub.publish('Diet:all-diets-ready', uniqueDiets)
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
module.exports = Diet;
