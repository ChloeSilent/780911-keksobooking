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
  // var housingRoomsSelectElement = filtersFormElement.querySelector('#housing-rooms');
  // var housingGuestsSelectElement = filtersFormElement.querySelector('#housing-guests');
  var DEFAULT_FILTER = 'any';


  var filterType = function (pin) {


    /* это изначальная длинная версия*/
    // console.log(housingTypeSelectElement.value)
    // if (housingTypeSelectElement.value === "palace") {
    //   return pin.offer.type === "palace";
    // } else if (housingTypeSelectElement.value === "house") {
    //   return pin.offer.type === 'house';
    // } else if (housingTypeSelectElement.value === "flat") {
    //   return pin.offer.type === "flat";
    // } else if (housingTypeSelectElement.value === "bungalo") {
    //   return pin.offer.type === "bungalo";
    // } else {
    //   return true;
    // }

    /* это уже переделанная функция выше в switch case*/

    // var value = housingTypeSelectElement.value;
    // switch (value) {
    //   case "palace":
    //     return pin.offer.type === value;
    //   case "house":
    //     return pin.offer.type === value;
    // }

    /* это финальная версия*/
    return (value === "any" || value === pin.offer.type)
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

  var otherFunction = function (function1) {
    return function () {
      function1(wizards);
    };
  };

  var FilterAll = function (wizards) {
    console.clear();
    // console.log(wizards.filter(filterType));
    console.log(wizards.filter(filterType));
    return wizards.filter(filterType).filter(filterPrice);
  };


  filtersFormElement.addEventListener('change', otherFunction(FilterAll));


})();
