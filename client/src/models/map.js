const leaflet = require('leaflet');
const tilesetKey = require('../helpers/tileset_key.js')
const PubSub = require('../helpers/pub_sub.js');

const Map = function () {
}

Map.prototype.bindEvents = function () {
  // TODO: change from using all dinosaurs to selected dinosaur
 PubSub.subscribe('DinosaurView:MapContainerReady', (evt) => {
   const dinosaur = evt.detail;
   this.createMap(dinosaur)
 })
}

Map.prototype.createMap = function (dinosaur) {
  console.log("COORDS TYPE: ", typeof dinosaur.coords[0]);
  if (typeof dinosaur.coords[0] === "number") {
    const newCoords = [dinosaur.coords];
    const map = L.map('map').setView(newCoords[0], 2);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: tilesetKey
    }).addTo(map);
    const icon = this.createIcon(dinosaur.imageId)
    newCoords.forEach((coordinates, index) => {
      L.marker(coordinates, icon).addTo(map)
    })
  }
  else {
    const map = L.map('map').setView(dinosaur.coords[0], 2);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: tilesetKey
    }).addTo(map);
    dinosaur.coords.forEach((coordinates, index) => {
      const icon = this.createIcon(dinosaur.imageId)
      L.marker(coordinates, icon).addTo(map)
    })
  }
};

Map.prototype.createIcon = function (imageID) {
  L.icon(`https://paleobiodb.org/data1.2/taxa/thumb.png?id=${imageID}`);
};

module.exports = Map
