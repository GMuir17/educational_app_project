const leaflet = require('leaflet');
const tilesetKey = require('../helpers/tileset_key.js')
const PubSub = require('../helpers/pub_sub.js');

const Map = function () {
}

Map.prototype.bindEvents = function () {
 PubSub.subscribe('Dinosaur:all-dinosaurs-ready', (evt) => {
   const dinosaur = evt.detail[0];
   console.log('dinosaur:', dinosaur);
   this.createMap(dinosaur)
 })
}

// Map.prototype.createFossilMap = function (dinosaur) {
//   this.createMap(dinosaur.coords)
//   L.addMarkers(dinosaur.coords, this.createIcon(dinosaur.imageId));
// };

Map.prototype.createMap = function (dinosaur) {
  const map = L.map('map').setView(dinosaur.coords[0], 2);
  console.log('map', map);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: tilesetKey
  }).addTo(map);
  const icon = this.createIcon(dinosaur.imageId)
  dinosaur.coords.forEach((coordinate, index) => {
    L.marker(coordinate, icon).addTo(map)
  })
};

Map.prototype.createIcon = function (imageID) {
  L.icon(`https://paleobiodb.org/data1.2/taxa/thumb.png?id=${imageID}`);
};

// Map.prototype.addMarkers = function (coordinates, icon) {
//  coordinates.forEach((coordinate, index) => {
//    L.marker(coordinate, icon).addTo(map)
//  })
// };

module.exports = Map
