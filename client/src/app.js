const leaflet = require('leaflet');
const tilesetKey = require('./helpers/tileset_key.js');
const TimePeriod = require('./models/time_period.js');
const TimelineView = require('./views/timeline_view.js');
const DietView = require('./views/diet_view.js');
const Diet = require('./models/diet.js');
const Dinosaur = require('./models/dinosaur.js');
const Map = require('./models/map.js')
const DinosaurView = require('./views/dinosaur_view.js')
const TimePeriodView = require('./views/time_period_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const timelineNav = document.querySelector('#timeline-container');
  const timelineView = new TimelineView(timelineNav);
  timelineView.bindEvents();

  const dietNav = document.querySelector('nav#families');
  const dietView = new DietView(dietNav);
  dietView.bindEvents();

  const diet = new Diet();
  diet.bindEvents();

  const dinosaur = new Dinosaur();
  dinosaur.bindEvents();

  const timePeriod = new TimePeriod();
  timePeriod.get();
  timePeriod.bindEvents();

  const dinosaurViewElement = document.querySelector('#dinosaur-view-container')
  const dinosaurView = new DinosaurView(dinosaurViewElement);
  dinosaurView.bindEvents();

  const timePeriodContainer = document.querySelector('#time-period-display-container');
  const timePeriodView = new TimePeriodView(timePeriodContainer);
  timePeriodView.bindEvents();
})
