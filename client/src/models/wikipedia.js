const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const Wikipedia = function () {
  this.dinosaurs = null;
  this.wikiDinosaurs = null;
};


Wikipedia.prototype.bindingEvents = function () {
  PubSub.subscribe(`Dinosaur:all-dinosaurs-ready`, (evt) => {
    this.dinosaurs = evt.detail;

    const dinosaursSelected = this.dinosaurs.slice(0, 8);


    Promise.all(dinosaursSelected.reduce((promises, object) => {
      console.log(object.name);
      const url =   `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${object.name}&exintro=1&explaintext=1&exsectionformat=plain&origin=*`
      const request = new RequestHelper(url);
      promises.push(request.get());

      const imgUrl =   `https://en.wikipedia.org/w/api.php?action=query&titles=${object.name}&format=json&prop=pageimages&origin=*`
      const requestImg = new RequestHelper(imgUrl);
      promises.push(requestImg.get());

      return promises;
    }, []))
    .then((dinosaursData) => {
      const wikiDinosaurs = dinosaursData
      // console.log(dinosaursData);
      const wikiDinosaursFiltered = filteredData(wikiDinosaurs);
      const allDinosaursData = this.mergeData(dinosaursSelected, wikiDinosaursFiltered);
      PubSub.publish('Wikipedia:All-dinosaurs-ready', allDinosaursData);
    })
    .catch((err) => {
      console.error(err);
    })



  })
}

function filteredData(wikiDinosaurs) {
  const newArray = [];
  for (i = 0; i < wikiDinosaurs.length; i++) {
    const pageNumber = Object.keys(wikiDinosaurs[i].query.pages);
    if (i % 2  === 0) {
      newArray.push(wikiDinosaurs[i].query.pages[pageNumber].extract)
    }
    else {
      newArray.push(wikiDinosaurs[i].query.pages[pageNumber].pageimage);
    }
  }
  return newArray;
};

Wikipedia.prototype.mergeData = function (dinosaursSelected, extraData) {
  return dinosaursSelected.reduce((merged, dinosaur, index) => {
    dinosaur.description = extraData[index * 2];
    dinosaur.image = extraData[(index * 2) + 1]
    merged.push(dinosaur);
    return merged;
  }, [])

};


module.exports = Wikipedia;
