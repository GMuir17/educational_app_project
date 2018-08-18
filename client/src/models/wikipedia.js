const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const Wikipedia = function () {
  this.url = '';
  this.dinosaurs = null;
  this.wikiDinosaurs = null;
};


Wikipedia.prototype.bindingEvents = function () {
  PubSub.subscribe(`Dinosaur:all-dinosaurs-ready`, (evt) => {
    this.dinosaurs = evt.detail;

    const dinosaursSelected = this.dinosaurs.slice(0, 8);


    Promise.all(dinosaursSelected.map(object => {
      console.log(object.name);
      this.url = `https://en.wikipedia.org/w/api.php?action=query&titles=${object.name}&format=json&prop=pageimages|extracts&origin=*`;
      const request = new RequestHelper(this.url);
      return request.get();
    }))
    .then((dinosaurData) => {
      this.wikiDinosaurs = dinosaurData;
      console.log(this.wikiDinosaurs);
      // const mergedDinosaursData = this.mergeData();
    })
    .catch((err) => {
      console.error(err);
    })



// Wikipedia.prototype.mergeData = function () {
//   this.dinosaurs.forEach((dinosaur, index) => {
//     dinosaur.concat(this.wikiDinosaurs[index])
//   })
// };
    //  this.dinosaurs.forEach((dinosaur) => {
    //    this.dinosaur.name = evt.newName;
    // }.then() =>{
       // this.url = `https://en.wikipedia.org/w/api.php?action=query&titles=${this.dinosaur.name}&format=json&prop=pageimages|extracts`
    //     const request = new Request(url)
    //     request.get()
    //     .then((data) =>{
    //       this.imageId = evt.imageId
    //       this.url = `https://en.wikipedia.org/w/api.php?action=query&titles=${this.imageId}&format=json&prop=pageimages|extracts`
    //     })
    //  }


  })
}


module.exports = Wikipedia;
