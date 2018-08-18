const leaflet = require('leaflet');
const tilesetKey = require('./helpers/tileset_key.js');
const TimePeriod = require('./models/time_period.js');
const TimelineView = require('./views/timeline_view.js');
const DietView = require('./views/diet_view.js');
const Diet = require('./models/diet.js');
const Dinosaur = require('./models/dinosaur.js');
const Map = require('./models/map.js')

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const timelineNav = document.querySelector('#timeline-container');
  const timelineView = new TimelineView(timelineNav);
  timelineView.bindingEvents();

  const dietNav = document.querySelector('nav#families');
  const dietView = new DietView(dietNav);
  dietView.bindingEvents();

  const diet = new Diet();
  diet.bindingEvents();

  const dinosaur = new Dinosaur();
  dinosaur.bindingEvents();

  const timePeriod = new TimePeriod();
  timePeriod.get();
  timePeriod.bindingEvents();

  const map = new Map();
  map.bindEvents();

})
