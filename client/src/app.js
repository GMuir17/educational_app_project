const leaflet = require('leaflet');
const tilesetKey = require('./helpers/tileset_key.js')
const TimePeriod = require('./models/time_period.js')

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  const map = L.map('map').setView([55.9472, -3.2017], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: tilesetKey
  }).addTo(map);

  const timePeriod = new TimePeriod();
  timePeriod.get();



})
