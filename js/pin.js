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
  var createOnePin = function (element) {
    var pinClone = pinTemplateElement.cloneNode(true);

    pinClone.style.left = element.location.x - window.pin.PIN_WIDTH + PX;
    pinClone.style.top = element.location.y - window.pin.PIN_HEIGHT + PX;
    pinClone.querySelector('img').src = element.author.avatar;
    pinClone.querySelector('img').alt = element.offer.avatar;
    pinClone.addEventListener('click', function () {
      window.card.drawOneCard(element);
      var allCardContainer = window.card.mapFiltersContainerElement.querySelectorAll('.map__card').length;
      if (allCardContainer > 1) {
        window.card.mapFiltersContainerElement.querySelector('.map__card').remove();
      }
    });

    return pinClone;
  };

  /* помещает один пин на карту */
  window.pin.putOnePin = function (element) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createOnePin(element));
    window.pin.mapElement.appendChild(fragment);
  };
})();
