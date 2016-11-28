// var Promise = require('bluebird');
var hotels;
var restaurants;
var activities;


$.ajax({
  method: 'GET',
  url: '/hotels'
})
.then(function(hotelsAJAX){
  hotels = hotelsAJAX;
  return $.ajax({
    method: 'GET',
     url: '/restaurants'
  });
})
.then(function(restaurantsAJAX){
  restaurants = restaurantsAJAX;
  return $.ajax({
    method: 'GET',
     url: '/activities'
  });
})
.then(function(activitiesAJAX){
  activities = activitiesAJAX;
})
.then(function(){
  $('body').append('<script src="/js/utils.js"></script><script src="/js/maps.js"></script><script src="/js/trip.js"></script><script src="/js/day.js"></script><script src="/js/attraction.js"></script><script src="/js/attractions.js"></script><script src="/js/options.js"></script><script src="/js/main.js"></script>');
})
.catch(console.error.bind(console));

// Promise.all([hotelsAJAX, restaurantsAJAX, activitiesAJAX])
// .spread(function (hotelsAJAX, restaurantsAJAX, activitiesAJAX) {
//   hotels = hotelsAJAX;
//   restaurants = restaurantsAJAX;
//   activities = activitiesAJAX;
// })
