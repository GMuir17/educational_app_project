const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const Dinosaur = function () {
  this.url = null;
  this.periodSelected = null;
};


Dinosaur.prototype.bindEvents = function () {
  PubSub.subscribe('Timeline:selected-period-ready', (evt) => {
    const period = evt.detail;
    this.url = `https://paleobiodb.org/data1.2/occs/list.json?base_name=dinosauria^aves&show=coords,ident,ecospace,img&idreso=genus&min_ma=${period.lateDate}&max_ma=${period.earlyDate}`;
    this.periodSelected = period.periodName;

    this.request = new RequestHelper(this.url);
    this.get();
  })
};


Dinosaur.prototype.get = function () {
  this.request.get()
    .then((dinosaurs) => {

      const dinosaursData = this.filterDinosaurData(dinosaurs.records);


      const dinosaursDataUnique = filterByGenusName(dinosaursData);
      PubSub.publish('Dinosaur:all-dinosaurs-ready', dinosaursDataUnique);
      PubSub.publish('Dinosaur:dinosaurs-ready', dinosaursDataUnique);
    })
    .catch((err) => {
      console.error(err);
    })
}

Dinosaur.prototype.filterDinosaurData = function (dinosaurs) {
  const newArray = [];

  dinosaurs.forEach((dinosaur) => {
    const newName = dinosaur.tna.split(' ');
    dino = {
      name: newName[0],
      coords: [dinosaur.lat, dinosaur.lng],
      enviroment: dinosaur.jev,
      diet: dinosaur.jdt,
      range: `${dinosaur.eag} - ${dinosaur.lag}`,
      imageId: dinosaur.img,
      period: this.periodSelected
    }
    newArray.push(dino)
  })
  return newArray;
}

function filterByGenusName(dinosaurs) {
  const filteredDinosaurs = dinosaurs.reduce((uniqueDinosaurs, dinosaur,   oldIndex) => {
    const dinosaurIsUnique = !uniqueDinosaurs.some((uniqueDinosaur) => {
      return uniqueDinosaur.name === dinosaur.name;
    });
    if (dinosaurIsUnique){
      uniqueDinosaurs.push(dinosaur);
    }
    else {
      const existingDinosaur = uniqueDinosaurs.find((existingDinosaur) => {
      return existingDinosaur.name === dinosaur.name;
      });
    if (Array.isArray(existingDinosaur.coords[0])) {
        existingDinosaur.coords.push(dinosaur.coords)
      }
    else {
        existingDinosaur.coords = [existingDinosaur.coords, dinosaur.coords];
      }
    }
    return uniqueDinosaurs;
  }, [])

    return filteredDinosaurs;
}


module.exports = Dinosaur;
