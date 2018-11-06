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
  window.filter = {};

  var DEFAULT_FILTER = 'any';

  var offerPrice = {
    'LOW': 10000,
    'HIGH': 50000
  };

  var filtersFormElement = document.querySelector('.map__filters');
  var housingTypeSelectElement = filtersFormElement.querySelector('#housing-type');
  var housingPriceSelectElement = filtersFormElement.querySelector('#housing-price');
  var housingRoomsSelectElement = filtersFormElement.querySelector('#housing-rooms');
  var housingGuestsSelectElement = filtersFormElement.querySelector('#housing-guests');

  var filtersInFormElements = filtersFormElement.querySelectorAll('.map__filter');
  var featuresLabelElements = filtersFormElement.querySelectorAll('.map__feature');
  var mapCheckboxElements = filtersFormElement.querySelectorAll('.map__checkbox');

  var featuresList = Array.from(mapCheckboxElements);

  //  дисэйблит фильтры
  window.filter.disableFilterForm = function () {
    /* убирает с селктов эффекты на ховере и ставит им дисйэбл*/
    filtersInFormElements.forEach(function (node) {
      node.disabled = true;
      node.classList.add('map__filter_no_hover');
    });
    /* убирает с лейблов эффекты на ховере*/
    featuresLabelElements.forEach(function (node) {
      node.classList.add('map__feature_no_hover');
    });
    /* дисэйблит именно чекбоксы на мапе*/
    mapCheckboxElements.forEach(function (node) {
      node.disabled = true;
    });

  };

  // активирует фильтры
  window.filter.aktiveFilterForm = function () {

    filtersInFormElements.forEach(function (node) {
      node.disabled = false;
      node.classList.remove('map__filter_no_hover');
    });

    featuresLabelElements.forEach(function (node) {
      node.classList.remove('map__feature_no_hover');
    });


    mapCheckboxElements.forEach(function (node) {
      node.disabled = false;
    });

    filtersFormElement.addEventListener('change', onFormChange);
  };
  // обновляет форму
  window.filter.setFilterFormNew = function () {
    filtersInFormElements.forEach(function (node) {
      node.value = '';
    });
    filtersFormElement.reset();
  };

  var filterType = function (pin) {
    var value = housingTypeSelectElement.value;
    return (value === DEFAULT_FILTER || value === pin.offer.type);
  };


  var filterPrice = function (pin) {
    var value = housingPriceSelectElement.value;
    switch (value) {
      case 'low':
        return pin.offer.price < offerPrice['LOW'];
      case 'middle':
        return pin.offer.price >= offerPrice['LOW'] && pin.offer.price < offerPrice['HIGH'];
      case 'high':
        return pin.offer.price >= offerPrice['HIGH'];
      default:
        return true;
    }
  };

  var filterRoom = function (pin) {

    var value = housingRoomsSelectElement.value;
    return (value === DEFAULT_FILTER || parseInt(value, 10) === pin.offer.rooms);
  };

  var filterGuest = function (pin) {
    var value = housingGuestsSelectElement.value;

    return (value === DEFAULT_FILTER || parseInt(value, 10) === pin.offer.guests);
  };

  var filterFeature = function (checkedFeatures, pin) {
    return checkedFeatures.every(function (feature) {
      return pin.offer.features.includes(feature.value);
    });

  };

  var filterAll = function (pinsData) {
    var checkedFeatures = featuresList.filter(function (feature) {
      return feature.checked;
    });

    return pinsData
      .filter(filterType)
      .filter(filterPrice)
      .filter(filterRoom)
      .filter(filterGuest)
      .filter(function (pin) {
        return filterFeature(checkedFeatures, pin);
      }).slice(0, 5);
  };

  var onFormChange = function () {

    window.debounce(function () {
      window.map.pinsRemove();
      window.map.cardsRemove();
      window.map.createPins(filterAll(window.map.pins));
    });
  };

  window.filter.disableFilterForm();

})();
