const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const Wikipedia = function () {
  this.dinosaurs = null;
  this.wikiDinosaurs = null;
  this.wikiImages = null;
  this.dinosaursSelected = null
};


Wikipedia.prototype.bindEvents = function () {
  PubSub.subscribe('Timeline:selected-period-ready', (evt) => {
    const period = evt.detail.periodName;
    const periodUrl =   `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${period}&exintro=1&explaintext=1&exsectionformat=plain&origin=*`
    const requestPeriod = new RequestHelper(periodUrl);
    requestPeriod.get()
      .then((period) => {
      const periodData = getPeriodData(period);
      PubSub.publish('Wikipedia:period-data-ready', periodData);
      })
  })

  PubSub.subscribe('Dinosaur:all-dinosaurs-ready', (evt) => {
    this.dinosaurs = evt.detail;
    this.dinosaursSelected = this.dinosaurs.slice(0, 8);


    Promise.all(this.dinosaursSelected.reduce((promises, object) => {
      const url =   `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${object.name}&exintro=1&explaintext=1&exsectionformat=plain&origin=*`
      const request = new RequestHelper(url);
      promises.push(request.get());

      return promises;
    }, []))
    .then((dinosaursData) => {
      this.wikiDinosaurs = getExtraData(dinosaursData);
      this.mergeData(this.wikiDinosaurs);
      console.log('log 1:', this.dinosaursSelected);
      Promise.all(this.dinosaursSelected.reduce((promises, object) => {
        const imgAddress =   `https://en.wikipedia.org/w/api.php?action=query&titles=${object.name}&format=json&prop=pageimages&origin=*`
        const requestaddress = new RequestHelper(imgAddress);
        promises.push(requestaddress.get());

        return promises;
      }, []))
      .then((images) => {
        console.log('log 2: ', images);
        const imgObject = images;
        const imgAddress = getAddress(imgObject);
        Promise.all(imgAddress.reduce((promises, object) => {
          const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=File:${object}&prop=imageinfo&iiprop=url&format=json&origin=*`
          const requestImg = new RequestHelper(imgUrl);
          promises.push(requestImg.get());

          return promises
        }, []))
        .then((imagesObject) => {
          console.log('log 3: ', imagesObject);
          this.wikiImages = getImagesUrl(imagesObject);
          this.mergeImages(this.wikiImages);

          PubSub.publish('Wikipedia:all-dinosaurs-ready', this.dinosaursSelected);
        })
      })

    })
    .catch((err) => {
      console.error(err);
    })
  })
}

function getPeriodData(object) {
  const pageNumber = Object.keys(object.query.pages);
  return object.query.pages[pageNumber].extract;
}

function getAddress(object) {
  const newArray = [];
  for (i = 0; i < object.length; i++) {
    const pageNumber = Object.keys(object[i].query.pages);
    newArray.push(object[i].query.pages[pageNumber].pageimage);
  };
  return newArray;
}

function getImagesUrl(objects) {
  const newArray = [];
  objects.forEach((object) => {
    if (object.query.pages["-1"].imageinfo === undefined) {
      newArray.push('/images/dinosaur-chicken-hybrid.png')
    }
    else {
      const url = object.query.pages["-1"].imageinfo[0].url;
      newArray.push(url)
    }
  })
  return newArray;
}

function getExtraData(object) {
  const newArray = [];
  for (i = 0; i < object.length; i++) {
    const pageNumber = Object.keys(object[i].query.pages);
    newArray.push(object[i].query.pages[pageNumber].extract);
  };
  return newArray;
}

Wikipedia.prototype.mergeImages = function (images) {
  this.dinosaursSelected.forEach((dinosaur, index) => {
    dinosaur.image = images[index];
  })
};


Wikipedia.prototype.mergeData = function (extraData) {
  this.dinosaursSelected.forEach((dinosaur, index) => {
    dinosaur.description = extraData[index];
  })
};


module.exports = Wikipedia;
