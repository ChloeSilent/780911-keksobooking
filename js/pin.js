'use strict';
// pin.js — модуль, который отвечает за создание пина — метки на карте и его отрисовку;


(function () {

  window.pin = {};

  window.pin.mapElement = document.querySelector('.map');
  var templatePinElement = document.body.querySelector('#pin');
  var pinTemplateElement = templatePinElement.content.querySelector('.map__pin');

  window.pin.PIN_HEIGHT = 81;
  window.pin.PIN_WIDTH = 50;
  var PX = 'px';


  /* создает один пин как элемент DOM*/
  window.pin.createPin = function (element) {
    var pinClone = pinTemplateElement.cloneNode(true);

    pinClone.style.left = element.location.x - window.pin.PIN_WIDTH + PX;
    pinClone.style.top = element.location.y - window.pin.PIN_HEIGHT + PX;
    var pinImage = pinClone.querySelector('img');
    pinImage.src = element.author.avatar;
    pinImage.alt = element.offer.avatar;
    pinClone.addEventListener('click', function () {

      var oldCardElement = window.card.mapFiltersContainerElement.querySelector('.map__card');
      if (oldCardElement) {
        oldCardElement.remove();
      }
      window.card.drawOneCard(element);
    });

    return pinClone;
  };


})();
