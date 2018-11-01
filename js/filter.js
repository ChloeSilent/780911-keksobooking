'use strict';
// render.js — модуль, который отвечает за сортировку объявлений и отрисовку их на карте;
/* - фильтровать с помощью фильтров, расположенных в блоке .map__filters
   - после фильтрации показать пины, соответсвующие выбранному критерию в фильтре или фильтрах
   - Метки, отрисованные до этого нужно убрать
   - Все выбранные фильтры применяются вместе: один фильтр не отменяет другие, выбранные до него.
   - показывать максимум 5 меток и в изначальном состоянии, и при изменении фильтра, независимо от выбранного фильтра
   - устранить дребезг
*/
window.render = {};

var filtersFormElement = document.querySelector('.map__filters');
var housingTypeSelectElement = filtersFormElement.querySelector('#housing-type');
var housingPriceSelectElement = filtersFormElement.querySelector('#housing-price');
// var housingRoomsSelectElement = filtersFormElement.querySelector('#housing-rooms');
// var housingGuestsSelectElement = filtersFormElement.querySelector('#housing-guests');
var DEFAULT_FILTER = 'any';


var filterType = function (pin) {

  if (housingTypeSelectElement.value === 'palace') {
    return pin.type.price === 'palace';
  } else if (housingTypeSelectElement.value === 'house') {
    return pin.type.price === 'house';
  } else if (housingTypeSelectElement.value === 'flat') {
    return pin.type.price === 'flat';
  } else if (housingTypeSelectElement.value === 'bungalo') {
    return pin.type.price === 'bungalo';
  } else {
    return true;
  }

};

var filterPrice = function (pin) {
  switch (housingPriceSelectElement.value) {
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


var filterAll = function (pins) {
  return pins
    .filter(filterType)
    .filter(filterPrice);
};
