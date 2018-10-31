'use strict';
/* карта деактивируется, при клике на главн пин снимется diabled с форм и карты, задаются координаты главного пина */
(function () {

  window.map = {};

  window.map.mainPinElement = document.querySelector('.map__pin--main');
  window.map.formAdElement = document.querySelector('.ad-form');
  window.map.fieldsetInFormContainer = window.map.formAdElement.querySelectorAll('fieldset');
  window.map.inputAddressElement = document.querySelector('#address');
  var bodyRect = window.map.mainPinElement.getBoundingClientRect();
  var mapImage = window.pin.mapElement.getBoundingClientRect();

  window.map.DEFAULT_X = 570;
  window.map.DEFAULT_Y = 375;
  // var AMOUNT = 8;
  // var pins = [];

  /* делает все инпуты, филдсеты, баттоны неактивными, делает неактивной карту */
  window.map.makeDisabled = function () {

    window.pin.mapElement.classList.add('map--faded');
    window.map.formAdElement.classList.add('ad-form--disabled');

    window.map.inputAddressElement.placeholder = window.map.DEFAULT_X + ', ' + window.map.DEFAULT_Y;

    window.map.mainPinElement.style.left = window.map.DEFAULT_X + 'px';
    window.map.mainPinElement.style.top = window.map.DEFAULT_Y + 'px';

    window.map.fieldsetInFormContainer.forEach(function (node) {
      node.disabled = true;
    });
  };
  window.map.makeDisabled();

  window.map.HALF_OF_WIDTH_PIN = 33;

  /* вычисляет координату по оси Х для главного пина, адаптировано под расширение окна путем вычета координат карты */
  var getCoordinateX = function () {
    return bodyRect.left - mapImage.left + window.scrollX + window.map.HALF_OF_WIDTH_PIN;

  };
  /* вычисляет координату по оси Y для главного пина*/
  var getCoordinateY = function () {
    return Math.abs(bodyRect.top) + window.pin.PIN_HEIGHT;

  };

  /* активация карты(убирается класс .map--faded) и делает все инпуты, филдсеты, баттоны активными.
  Вычислет координаты главного пина, создает пины объявлений */
  window.map.makeActive = function () {
    /* удаляет disabled с карты и форм*/
    window.pin.mapElement.classList.remove('map--faded');
    window.map.formAdElement.classList.remove('ad-form--disabled');
    window.map.fieldsetInFormContainer.forEach(function (node) {
      node.disabled = false;
    });
    window.map.inputAddressElement.value = getCoordinateX() + ', ' + getCoordinateY();

  };

  window.backend.dataload(function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i] = window.data.createObject(i);
      window.pin.putOnePin(elements[i]);
    }
  });


  // window.map.createAndPutAllPins = function () {
  //   for (var i = 0; i < AMOUNT; i++) {
  //     pins[i] = window.data.createObject(i);
  //     window.pin.putOnePin(pins[i]);
  //   }
  // };

})();
