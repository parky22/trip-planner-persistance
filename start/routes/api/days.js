var express = require('express');
var router = express.Router();
var Day = require('../../models/day');

module.exports = router;

// GET - List all days
router.get('/', function(req, res, next){
    Day.findAll({})
    .then(function(days) {
        res.json(days);
    })
    .catch(next);
});


// GET - one specific day

// GET - delete one specific day

// POST - create a new day
router.post('/', function(req, res, next) {
    Day.create({
        number: +req.body.number
    })
    .then(function(createdDay) {
        res.json(createdDay);
    })
    .catch(next);
});

// POST - add attraction

// DELETE - remove current day
router.delete('/', function(req, res, next) {
    Day.destroy({
        where: {
            number: +req.body.number
        }
    })
    .then(function(deletedDay) {
        res.json(deletedDay);
    })
    .catch(next);
});


// $.get('/days')
// .then(function (data) { console.log('GET response data', data) })
// .catch(console.error.bind(console));

// $.post('/days', { number: 4 })
// .then(function (data) { console.log('POST response data', data) })
// .catch(console.error.bind(console));


// $.ajax({
//     url: '/days',
//     type: 'DELETE',
//     data: { number: 2 },
// })
// .then(function (data) { console.log('POST response data', data) })
// .catch(console.error.bind(console));
