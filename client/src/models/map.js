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
      L.marker(coordinates, {icon: icon}).addTo(map)
    })
  }
  else {
    const map = L.map('map').setView(dinosaur.coords[0], 2);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: tilesetKey
    }).addTo(map);
    const icon = this.createIcon(dinosaur.imageId)
    console.log('Createmap icon:', icon);
    dinosaur.coords.forEach((coordinates, index) => {
      L.marker(coordinates, {icon: icon}).addTo(map)
    })
  }
};

Map.prototype.createIcon = function (imageID) {
  const icon = L.icon({
    iconUrl:`https://paleobiodb.org/data1.2/taxa/thumb.png?id=${imageID}`,
    shadowUrl: `images/shadow.png`,
    iconSize:     [64, 64],
    shadowSize:   [64, 64],
    iconAnchor:   [32, 32],
    shadowAnchor: [0, 0],
    popupAnchor:  [0, 0]
  });
  console.log('createicon icon:', icon);
  return icon;
};

module.exports = Map
