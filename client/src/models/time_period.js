const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const TimePeriod - function () {
  this.url = '';
  this.request = New RequestHelper(this.url)
}

Dinosaur.prototype.get = function () {
  this.request.get();
    .then((periods) => {
      PubSub.publish('TimePeriod:all-periods-ready', periods);
    })
    .catch((err) => {
      console.error(err);
    })
}

module.exports = TimePeriod;
