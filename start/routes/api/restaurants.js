var router = require('express').Router();
var Promise = require('bluebird');
var Restaurant = require('../../models/restaurant');


router.get('/', function(req, res, next){
  Restaurant.findAll()
  .then(function(restaurants){
    res.json(restaurants);
  })
  .catch(next);
});

module.exports = router;