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
      this.url =   `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${object.name}&exintro=1&explaintext=1&exsectionformat=plain&origin=*`
      const request = new RequestHelper(this.url);
      return request.get();
    }))
    .then((dinosaurData) => {
      this.wikiDinosaurs = dinosaurData;
      console.log(this.wikiDinosaurs);
      this.url2 =   `https://en.wikipedia.org/w/api.php?action=query&titles=${object.name}&format=json&prop=pageimages&origin=*`
      const request2 = new RequestHelper(this.url2);
      return request2.get();
      // const mergedDinosaursData = this.mergeData();
    })
    .then((dinosaursImages) => {
      this.wikiImageId = dinosaursImages;
      console.log(this.wikiImageId);
    })
    .catch((err) => {
      console.error(err);
    })



    // Wikipedia.prototype.getImageId = function() {
     //  this.url = 'https://en.wikipedia.org/w/api.php?action=query&titles=${object.name}&format=json&prop=pageimages&origin=*'
     //  const request = new RequestHelper(this.url)
     //  request.get();
     // };

//      Wikipedia.prototype.getImageUrl = function(imageId) {
//   const request = new
// };

    console.log(`wkik`, this.wikiDinosaurs);
    console.log(`dinosaursSelected`, dinosaursSelected);

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
