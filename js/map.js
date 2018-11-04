'use strict';
/* карта деактивируется, при клике на главн пин снимется diabled с форм и карты, задаются координаты главного пина */
(function () {

  window.map = {};

  window.map.DEFAULT_X = 570;
  window.map.DEFAULT_Y = 375;
  window.map.HALF_OF_WIDTH_PIN = 33;
  var PINS_AMOUNT = 5;

  window.map.mainPinElement = document.querySelector('.map__pin--main');

  var bodyRect = window.map.mainPinElement.getBoundingClientRect();
  var mapImage = window.pin.mapElement.getBoundingClientRect();


  /* делает все инпуты, филдсеты, баттоны неактивными, делает неактивной карту */
  window.map.makeDisabled = function () {

    window.pin.mapElement.classList.add('map--faded');
    window.map.mainPinElement.style.left = window.map.DEFAULT_X + 'px';
    window.map.mainPinElement.style.top = window.map.DEFAULT_Y + 'px';

  };
  window.map.makeDisabled();

  /* функция удаляющая все  пины*/
  window.map.pinsRemove = function () {
    var allPinsContainer = window.pin.mapElement.querySelectorAll('.map__pin');
    allPinsContainer.forEach(function (node) {
      if (!node.classList.contains('map__pin--main')) {
        node.remove();
      }
    });
  };

  /* функция удаляющая все  карточки*/
  window.map.cardsRemove = function () {
    var cardElement = document.querySelector('.map__card');
    if (cardElement) {
      cardElement.remove();
    }
  };


  /* вычисляет координату по оси Х для главного пина, адаптировано под расширение окна путем вычета координат карты */
  window.map.getCoordinateX = function () {
    return bodyRect.left - mapImage.left + window.scrollX + window.map.HALF_OF_WIDTH_PIN;

  };
  /* вычисляет координату по оси Y для главного пина*/
  window.map.getCoordinateY = function () {
    return Math.abs(bodyRect.top) + window.pin.PIN_HEIGHT;

  };

  /* активация карты(убирается класс .map--faded) и делает все инпуты, филдсеты, баттоны активными.
  Вычислет координаты главного пина, создает пины объявлений */
  window.map.makeActive = function () {
    /* удаляет disabled с карты и форм*/
    window.pin.mapElement.classList.remove('map--faded');
    window.filter.aktiveFilterForm();
    window.form.makeFormActive();
  };

  /* помещает один пин на карту */

  window.map.createPins = function (pins) {
    var fragment = document.createDocumentFragment();

    pins.slice(0, PINS_AMOUNT).forEach(function (pin) {
      fragment.appendChild(window.pin.createPin(pin));
    });

    window.pin.mapElement.appendChild(fragment);
  };

  window.map.onLoadPins = function (data) {
    window.map.pins = data;

    window.map.createPins(window.map.pins);
  };

})();
