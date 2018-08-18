const leaflet = require('leaflet');
const tilesetKey = require('./helpers/tileset_key.js')
const TimePeriod = require('./models/time_period.js')
const TimelineView = require('./views/timeline_view.js')
const Dinosaur = require('./models/dinosaur.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
  
  const dinosaur = new Dinosaur();
  dinosaur.bindingEvents();

  const timelineNav = document.querySelector('#timeline-container');
  const timelineView = new TimelineView(timelineNav);
  timelineView.bindingEvents();

  const timePeriod = new TimePeriod();
  timePeriod.get();
  timePeriod.bindingEvents();


})
