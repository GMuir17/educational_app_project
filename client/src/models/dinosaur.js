const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const Dinosaur = function () {
  this.url = null;
  this.periodSelected = null;
};


Dinosaur.prototype.bindingEvents = function () {
  PubSub.subscribe('Timeline:selected-period-ready', (evt) => {
    const period = evt.detail;
    console.log(evt);
    this.url = `https://paleobiodb.org/data1.2/occs/list.json?base_name=dinosauria^aves&show=coords,ident,ecospace,img&idreso=genus&min_ma=${period.lateDate}&max_ma=${period.earlyDate}`;
    this.periodSelected = period.periodName;
    console.log('eooooo?:', this.periodSelected);
    this.request = new RequestHelper(this.url);
    this.get();
  })
};


Dinosaur.prototype.get = function () {
  this.request.get()
    .then((dinosaurs) => {
      // console.log(dinosaurs);
      const dinosaursData = this.filterDinosaurData(dinosaurs.records);
      console.log(dinosaursData);
      // console.log('dinosaurs data:', dinosaursData);
      const dinosaursDataUnique = filterByGenusName(dinosaursData);
      PubSub.publish('Dinosaur:all-dinosaurs-ready', dinosaursDataUnique);
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
  const filteredDinosaurs = dinosaurs.reduce((uniqueDinosaurs, dinosaur, oldIndex) => {
    // check if dinosaur is already in new array
    const dinosaurIsUnique = !uniqueDinosaurs.some((uniqueDinosaur) => {
      return uniqueDinosaur.name === dinosaur.name;
    });

    // if dinosaur is not in new array, then add it to new array
    if (dinosaurIsUnique){
      uniqueDinosaurs.push(dinosaur);
    }
    else {
      // if dinosaur is already in new array, then find the object
      const existingDinosaur = uniqueDinosaurs.find((existingDinosaur) => {
        return existingDinosaur.name === dinosaur.name;
      });

      // if the object already has an array of coordinates, then add the current
      // dinosaur's array of coords to it
      if (Array.isArray(existingDinosaur.coords[0])) {
        existingDinosaur.coords.push(dinosaur.coords)
      }
      else {
        // if the object doesn't have an array of coordinates then add the old
        // coords and the new ones to an array
        existingDinosaur.coords = [existingDinosaur.coords, dinosaur.coords];
      }
    }
    return uniqueDinosaurs;
  }, [])
  // console.log('filteredDinosaurs:', filteredDinosaurs);
  return filteredDinosaurs;
}


module.exports = Dinosaur;
