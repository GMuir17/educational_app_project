const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request.js');

const Wikipedia = function () {
  this.url = '';
  this.dinosaurs = null;
};


Wikipedia.prototype.bindingEvents = function () {
  PubSub.subscribe(`Dinosaur:all-dinosaurs-ready`, (evt) => {
    this.dinosaurs = evt.detail
     this.dinosaurs.forEach((dinosaur) => {
       this.dinosaur.name = evt.newName;
    }.then() =>{
      this.url = `https://en.wikipedia.org/w/api.php?action=query&titles=${this.dinosaur.name}&format=json&prop=pageimages|extracts`
        const request = new Request(url)
        request.get()
        .then((data) =>{
          this.imageId = evt.imageId
          this.url = `https://en.wikipedia.org/w/api.php?action=query&titles=${this.imageId}&format=json&prop=pageimages|extracts`
        })
     }


  })
}


module.exports = Wikipedia;
