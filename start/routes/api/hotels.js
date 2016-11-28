var router = require('express').Router();
var Promise = require('bluebird');
var Hotel = require('../../models/hotel');

router.get('/', function(req, res, next){
  Hotel.findAll()
  .then(function(hotels){
    res.json(hotels);
  })
  .catch(next);
});

module.exports = router;