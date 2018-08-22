const PubSub = require('../helpers/pub_sub.js');

const Diet = function () {
  this.dinosaurs = null;
}

Diet.prototype.bindEvents = function () {
  PubSub.subscribe('Dinosaur:dinosaurs-ready', (evt) => {
    this.dinosaurs = evt.detail;
    const uniqueDiets = getUniqueDiets(this.dinosaurs);
    const uniqueDietsSorted = uniqueDiets.sort();
    PubSub.publish('Diet:all-diets-ready', uniqueDietsSorted);

    PubSub.subscribe('DietView:selected-diet', (evt) => {
      console.log("SELECTED DIET");
      const selectedIndex = evt.detail;
      if (selectedIndex === -1) {
        PubSub.publish('Dinosaur:all-dinosaurs-ready', this.dinosaurs)
      }
      else {
        const selectedDiet = uniqueDietsSorted[selectedIndex];
        const filteredDinosaurs = this.getDinosaursByDiet(selectedDiet);
        PubSub.publish('Dinosaur:all-dinosaurs-ready', filteredDinosaurs);
      }
    })
  })
};

function getUniqueDiets(dinosaurs) {
  const filteredDiets = dinosaurs.reduce((uniqueDiets, dinosaur, index) => {
    const dietIsUnique = !uniqueDiets.some((uniqueDiet) => {
      return uniqueDiet === dinosaur.diet;
    })

    if (dietIsUnique) {
      uniqueDiets.push(dinosaur.diet)
    }
    return uniqueDiets
  }, []);
  return filteredDiets;
}

Diet.prototype.getDinosaursByDiet = function (dietSelected) {
  return this.dinosaurs.filter(dinosaur => dinosaur.diet === dietSelected);
};


module.exports = Diet;
