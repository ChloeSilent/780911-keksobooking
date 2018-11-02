'use strict';
// render.js — модуль, который отвечает за сортировку объявлений и отрисовку их на карте;
/* - фильтровать с помощью фильтров, расположенных в блоке .map__filters
   - после фильтрации показать пины, соответсвующие выбранному критерию в фильтре или фильтрах
   - Метки, отрисованные до этого нужно убрать
   - Все выбранные фильтры применяются вместе: один фильтр не отменяет другие, выбранные до него.
   - показывать максимум 5 меток и в изначальном состоянии, и при изменении фильтра, независимо от выбранного фильтра
   - устранить дребезг
*/

(function () {
  window.render = {};

  var filtersFormElement = document.querySelector('.map__filters');
  var housingTypeSelectElement = filtersFormElement.querySelector('#housing-type');
  var housingPriceSelectElement = filtersFormElement.querySelector('#housing-price');
  var housingRoomsSelectElement = filtersFormElement.querySelector('#housing-rooms');
  var housingGuestsSelectElement = filtersFormElement.querySelector('#housing-guests');
  var DEFAULT_FILTER = 'any';


  var filterType = function (pin) {
    var value = housingTypeSelectElement.value;
    return (value === DEFAULT_FILTER || value === pin.offer.type);
  };


  var filterPrice = function (pin) {
    var value = housingPriceSelectElement.value;
    switch (value) {
      case 'low':
        return pin.offer.price < 10000;
      case 'middle':
        return pin.offer.price >= 10000 && pin.offer.price < 50000;
      case 'high':
        return pin.offer.price >= 50000;
      default:
        return true;
    }
  };

  var filterRoom = function (pin) {
    var value = housingRoomsSelectElement.value;
    if (value === DEFAULT_FILTER) {
      return true;
    } else {
      value = parseInt(housingRoomsSelectElement.value, 10);
      return value === pin.offer.rooms;
    }

  };

  var filterGuest = function (pin) {
    var value = housingGuestsSelectElement.value;
    if (value === DEFAULT_FILTER) {
      return true;
    } else {
      value = parseInt(housingGuestsSelectElement.value, 10);
      return value === pin.offer.guests;
    }

  };

  var otherFunction = function (function1) { // сюда передавать уже данные, в остальных функциях только аргументы!!!
    return function () {
      function1(window.backend.pinsData);
      // console.log(window.backend.pinsData);
    };
  };

  var FilterAll = function (pinsData) {
    window.map.pinsRemove();
    window.map.cardsRemove();
    // console.clear();
    // console.log(pinsData.filter(filterType));
    // return pinsData.filter(filterType).filter(filterPrice).filter(filterRoom);
    window.map.createPins(pinsData.filter(filterType).filter(filterPrice).filter(filterRoom).filter(filterGuest).slice(0, 5));
    return pinsData.filter(filterType).filter(filterPrice).filter(filterRoom).filter(filterGuest);
  };


  filtersFormElement.addEventListener('change', otherFunction(FilterAll));


})();
