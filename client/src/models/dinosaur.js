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

      PubSub.publish('Dinosaur:all-dinosaurs-ready', dinosaurs);
    })
    .catch((err) => {
      console.error(err);
    })
}

module.exports = Dinosaur;
