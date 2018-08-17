const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const Dinosaur = function () {
  this.url = '';
  this.request = new RequestHelper(this.url);
};



Dinosaur.prototype.get = function () {
  this.request.get();
    .then((dinosaurs) => {
      PubSub.publish('Dinosaur:all-dinosaurs-ready', dinosaurs);
    })
    .catch((err) => {
      console.error(err);
    })
}

module.exports = Dinosaur;
