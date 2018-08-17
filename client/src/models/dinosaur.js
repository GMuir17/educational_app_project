const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const Dinosaur = function () {
  this.url = null;
};


Dinosaur.prototype.bindingEvents = function () {
  PubSub.subscribe('Timeline:selected-period-ready', (evt) => {
    const period = evt.detail;
    console.log(evt.detail);
    this.url = `https://paleobiodb.org/data1.2/occs/list.json?base_name=dinosauria^aves&show=coords,ident,ecospace,img&idreso=genus&min_ma=${period.lateDate}&max_ma=${period.earlyDate}`;
    this.request = new RequestHelper(this.url);
    this.get();
  })
};


Dinosaur.prototype.get = function () {
  this.request.get()
    .then((dinosaurs) => {
      console.log(dinosaurs);
      // const filterNames = filterByGenusName(dinosaurs.records);
      const dinosaursData = filterDinosaurData(dinosaurs.records);
      console.log(dinosaursData);
      PubSub.publish('Dinosaur:all-dinosaurs-ready', dinosaurs);
    })
    .catch((err) => {
      console.error(err);
    })
}

function filterDinosaurData(dinosaurs) {
  const newArray = [];
  dinosaurs.forEach((dinosaur) => {
    dino = {
      name: dinosaur.tna,
      coords: [dinosaur.lat, dinosaur.lng],
      enviroment: dinosaur.jev,
      diet: dinosaur.jdt,
      range: `${dinosaur.eag} - ${dinosaur.lag}`,
      imageId: dinosaur.img
    }
    newArray.push(dino)
  })
  return newArray;
}

// function filterByGenusName(dinosaurs) {
//   const names = firstname(dinosaurs);
//   dinosaurs.forEach((dinosaur) => {
//     if (dinosaur.tna)
//   })
//
// }

module.exports = Dinosaur;
