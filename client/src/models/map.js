const leaflet = require('leaflet');
const tilesetKey = require('./helpers/tileset_key.js')

const Map = function () {
}

Map.prototype.createFossilMap = function (dinosaur) {
  const newMap = this.createMap(dinosaur.coords);
  const icon = this.createIcon(dinosaur.imageId);
  return newMap.addMarkers(icon);
};

Map.prototype.createMap = function (coordinates) {
  L.map('map').setView(coordinates[0], 6);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: tilesetKey
  }).addTo(map);
};

Map.prototype.createIcon = function (imageID) {
  L.icon(`https://paleobiodb.org/data1.2/taxa/thumb.png?id=${imageID}`);
};

Map.prototype.addMarkers = function (icon) {
 this.coordinates.forEach(coordinate, index) => {
   L.marker(coordinate, icon).addTo(map)
 }
};

module.exports = Map
