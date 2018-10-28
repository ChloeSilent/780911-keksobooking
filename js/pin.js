'use strict';
// pin.js — модуль, который отвечает за создание пина — метки на карте;


(function () {
  /* переменные пина*/

  var templatePinElement = document.body.querySelector('#pin');
  var pinTemplateElement = templatePinElement.content.querySelector('.map__pin');

  window.PIN_HEIGHT = 81;
  window.PIN_WIDTH = 50;
  var PX = 'px';
  /* создает один пин как элемент DOM*/
  window.createOnePin = function (element) {
    var pinClone = pinTemplateElement.cloneNode(true);

    pinClone.style.left = element.location.x - window.PIN_WIDTH + PX;
    pinClone.style.top = element.location.y - window.PIN_HEIGHT + PX;
    pinClone.querySelector('img').src = element.author.avatar;
    pinClone.querySelector('img').alt = element.offer.avatar;
    pinClone.addEventListener('click', function () {
      window.map.drawOneCard(element);
      var allCardContainer = window.map.mapFiltersContainerElement.querySelectorAll('.map__card').length;
      if (allCardContainer > 1) {
        window.map.mapFiltersContainerElement.querySelector('.map__card').remove();
      }
    });

    return pinClone;
  };


})();
