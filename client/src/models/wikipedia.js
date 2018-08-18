const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const Wikipedia = function () {
  this.url = '';
  this.request = new RequestHelper(this.url);
};


Wikipedia.prototype.bindingEvents = function () {
  PubSub.subscribe(`Dinosaur:all-dinosaurs-ready`, (evt) => {

  })
}


module.exports = Wikipedia;
