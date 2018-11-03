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
  var featuresList = Array.from(document.querySelector('.map__filters').querySelectorAll('.map__checkbox:checked'));
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

  var filterFeature = function (pin) {


    // for (var i = 0; i < featuresList.length; i++) {
    // for (var i = featuresList.length; i >= 0; i--) {
    // console.log('111111111111111');
    // console.log(pin.offer.features.every(featuresList[i]));
    // pin.offer.features.includes(featuresList[i]);
    //   if (pin.offer.features.includes(featuresList[i])) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }


    // featuresList.forEach(function (item) {
    //   console.log(item.value);
    //   console.log(pin.offer.features);
    //   // return pin.offer.features.includes(item.value);

    // });
    // return item.value;
    return featuresList.every(function (it) {
      return pin.offer.features.includes(it.value);
    });

  };

  var mainFilter = function (filterData) { // сюда передавать уже данные, в остальных функциях только аргументы!!!
    return function () {
      filterData(window.backend.pinsData);
    };
  };

  var FilterAll = function (pinsData) {
    window.map.pinsRemove();
    window.map.cardsRemove();
    // console.clear();
    // filterFeature();

    window.map
    .createPins(pinsData
      .filter(filterType)
      .filter(filterPrice)
      .filter(filterRoom)
      .filter(filterGuest)
      .filter(filterFeature)
      .slice(0, 5));

    return pinsData
      .filter(filterType)
      .filter(filterPrice)
      .filter(filterRoom)
      .filter(filterGuest)
      .filter(filterFeature);
  };


  filtersFormElement.addEventListener('change', mainFilter(FilterAll));


})();
