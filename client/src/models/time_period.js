const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const TimePeriod = function () {
  this.url = 'https://paleobiodb.org/data1.2/intervals/list.json?min_ma=65&max_ma=250&scale_level=4';
  this.request = new RequestHelper(this.url);
}

TimePeriod.prototype.get = function () {
  this.request.get()
    .then((periods) => {
      console.log(periods.records);
      PubSub.publish('TimePeriod:all-periods-ready', periods.records);
    })
    .catch((err) => {
      console.error(err);
    })
}

module.exports = TimePeriod;
