const PubSub = require('../helpers/pub_sub.js');

const Diet = function () {
  this.dinosaurs = null;
}

Diet.prototype.bindingEvents = function () {
  PubSub.subscribe('Dinosaur:all-dinosaurs-ready', (evt) => {
    const dinosaurs = evt.detail;
    const uniqueDiets = getUniqueDiets(dinosaurs);
    const uniqueDietsSorted = uniqueDiets.sort();
    PubSub.publish('Diet:all-diets-ready', uniqueDietsSorted);

    PubSub.subscribe('DietView:selected-diet', (evt) => {
      const selectedIndex = evt.target.value;
      console.log(selectedIndex); 
    })
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
