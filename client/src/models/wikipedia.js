const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const Wikipedia = function () {
  this.dinosaurs = null;
  this.wikiDinosaurs = null;
  this.wikiImageId = null;
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
    .then((dinosaurData) => {
      this.wikiDinosaurs = dinosaurData
      console.log(dinosaurData);
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
