'use strict';
/* global $ dayModule */

/**
 * A module for managing multiple days & application state.
 * Days are held in a `days` array, with a reference to the `currentDay`.
 * Clicking the "add" (+) button builds a new day object (see `day.js`)
 * and switches to displaying it. Clicking the "remove" button (x) performs
 * the relatively involved logic of reassigning all day numbers and splicing
 * the day out of the collection.
 *
 * This module has four public methods: `.load()`, which currently just
 * adds a single day (assuming a priori no days); `switchTo`, which manages
 * hiding and showing the proper days; and `addToCurrent`/`removeFromCurrent`,
 * which take `attraction` objects and pass them to `currentDay`.
 */

var tripModule = (function () {

  // application state

  var days = [],
      currentDay;

  // jQuery selections

  var $addButton, $removeButton;
  $(function () {
    $addButton = $('#day-add');
    $removeButton = $('#day-title > button.remove');
  });

  // method used both internally and externally

  function switchTo (newCurrentDay) {
    if (currentDay) currentDay.hide();
    currentDay = newCurrentDay;
    currentDay.show();
  }

  // jQuery event binding

  $(function () {
    $addButton.on('click', addDay);
    $removeButton.on('click', deleteCurrentDay);
  });

  function addDay () {
    if (this && this.blur) this.blur(); // removes focus box from buttons
    // var newDay = dayModule.create({ number: days.length + 1 }); // dayModule
    updateCurrentDay();
    $.post('/days', { number: days.length + 1 })
    .then((createdDay) => {
        var newDay = dayModule.create(createdDay);
        days.push(newDay);
        if (days.length === 1) {
          currentDay = newDay;
        }
        switchTo(newDay);
    })
    .catch(console.error.bind(console));

  }

  function deleteCurrentDay () {
    // prevent deleting last day
    if (days.length < 2 || !currentDay) return;
    // remove from the collection
    var index = days.indexOf(currentDay),
      previousDay = days.splice(index, 1)[0],
      newCurrent = days[index] || days[index - 1];
    // fix the remaining day numbers
    days.forEach(function (day, i) {
      day.setNumber(i + 1);
    });
    switchTo(newCurrent);
    previousDay.hideButton();
  }

  function load () {
    $.get('/days')
    .then(function (foundDays) {
        if (foundDays) {
          console.log(foundDays);
            foundDays.forEach((day) => {
              var newDay = dayModule.create(day);
              var attractionHotel = attractionsModule.getByTypeAndId('hotel', day.hotelId);
              console.log('new Day', newDay);
              console.log('attraction hotel', attractionHotel);
              if(attractionHotel){
                newDay.addAttraction(attractionHotel);
              }
              days.push(newDay);
            });
        } else {
            // add a day
        }
    })
    .catch(console.error.bind(console));
  }

function updateCurrentDay(){
  $.ajax({
    type: 'PUT',
    url: '/days',
    data: {dayNumber: currentDay.number, hotel: currentDay.hotel.id, restaurants: currentDay.restaurants, activities: currentDay.activities}
  });
}

  // globally accessible module methods

  var publicAPI = {

    load: load,

    switchTo: switchTo,

    addToCurrent: function (attraction) {
      currentDay.addAttraction(attraction);
    },

    removeFromCurrent: function (attraction) {
      currentDay.removeAttraction(attraction);
    }

  };

  return publicAPI;

}());
