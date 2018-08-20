const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const Wikipedia = function () {
  this.dinosaurs = null;
  this.wikiDinosaurs = null;
  this.wikiImages = null;
  this.dinosaursSelected = null
};


Wikipedia.prototype.bindingEvents = function () {
  PubSub.subscribe(`Dinosaur:all-dinosaurs-ready`, (evt) => {
    this.dinosaurs = evt.detail;

    this.dinosaursSelected = this.dinosaurs.slice(0, 8);


<<<<<<< HEAD
    Promise.all(dinosaursSelected.reduce((promises, object) => {
=======
    Promise.all(this.dinosaursSelected.reduce((promises, object) => {
>>>>>>> develop
      const url =   `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${object.name}&exintro=1&explaintext=1&exsectionformat=plain&origin=*`
      const request = new RequestHelper(url);
      promises.push(request.get());

      // const imgUrl =   `https://en.wikipedia.org/w/api.php?action=query&titles=${object.name}&format=json&prop=pageimages&origin=*`
      // const requestImg = new RequestHelper(imgUrl);
      // promises.push(requestImg.get());

      return promises;
    }, []))
    .then((dinosaursData) => {

      Promise.all(this.dinosaursSelected.reduce((promises, object) => {
        const imgAddress =   `https://en.wikipedia.org/w/api.php?action=query&titles=${object.name}&format=json&prop=pageimages&origin=*`
        const requestaddress = new RequestHelper(imgAddress);
        promises.push(requestaddress.get());

        return promises;
        }, []))
        .then((images) => {
          const imgObject = images;
          const imgAddress = getAddress(imgObject);
          Promise.all(imgAddress.reduce((promises, object) => {
            const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=File:${object}&prop=imageinfo&iiprop=url&format=json&origin=*`
            const requestImg = new RequestHelper(imgUrl);
            promises.push(requestImg.get());

            return promises
          }, []))
          .then((imagesObject) => {
            this.wikiImages = getImagesUrl(imagesObject);
            this.mergeImages(this.wikiImages);
          })
        })

        this.wikiDinosaurs = getExtraData(dinosaursData);
        this.mergeData(this.wikiDinosaurs);
        console.log('yujuuuuuuuu: ', this.dinosaursSelected);

        PubSub.publish('Wikipedia:all-dinosaurs-ready', this.dinosaursSelected);
      // console.log(dinosaursData);
      // const wikiDinosaursFiltered = filteredData(wikiDinosaurs);
      // const allDinosaursData = this.mergeData(dinosaursSelected, wikiDinosaursFiltered);
      // PubSub.publish('Wikipedia:All-dinosaurs-ready', allDinosaursData);
    })
    .catch((err) => {
      console.error(err);
    })



  })
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

    const url = object.query.pages["-1"].imageinfo[0].url;
    if (object.query === undefined) {
      newArray.push('No image avaliable')
    }
    else {
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
// function filteredData(wikiDinosaurs) {
//   const newArray = [];
//   for (i = 0; i < wikiDinosaurs.length; i++) {
//     const pageNumber = Object.keys(wikiDinosaurs[i].query.pages);
//     if (i % 2  === 0) {
//       newArray.push(wikiDinosaurs[i].query.pages[pageNumber].extract)
//     }
//     else {
//       newArray.push(wikiDinosaurs[i].query.pages[pageNumber].pageimage);
//     }
//   }
//   return newArray;
// };
//
Wikipedia.prototype.mergeData = function (extraData) {
  console.log(extraData[0]);
  this.dinosaursSelected.forEach((dinosaur, index) => {
    dinosaur.description = extraData[index];
  })
};


module.exports = Wikipedia;
