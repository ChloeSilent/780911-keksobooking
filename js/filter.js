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
  // var housingGuestsSelectElement = filtersFormElement.querySelector('#housing-guests');
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
    return (value === DEFAULT_FILTER || value === pin.offer.rooms);

  };
  var otherFunction = function (function1) {
    return function () {
      function1(window.backend.pinsData);
    };
  };

  var FilterAll = function (pinsData) {
    // console.clear();
    // console.log(wizards.filter(filterType));
    // console.log(wizards.filter(filterType));
    return pinsData.filter(filterType).filter(filterPrice).filter(filterRoom);
  };


  filtersFormElement.addEventListener('change', otherFunction(FilterAll));


})();
