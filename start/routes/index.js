var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
var hotelsRouter = require('./api/hotels.js');
var restaurantsRouter = require('./api/restaurants.js');
var activitiesRouter = require('./api/activities.js');


router.get('/', function(req, res, next) {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
  .spread(function(dbHotels, dbRestaurants, dbActivities) {
    res.render('index', {
      templateHotels: dbHotels,
      templateRestaurants: dbRestaurants,
      templateActivities: dbActivities
    });
  })
  .catch(next);
});

router.use('/hotels', hotelsRouter);
router.use('/restaurants', restaurantsRouter);
router.use('/activities', activitiesRouter);


module.exports = router;
