'use strict';
// запуск всех слушателей по клику на гл пин и их снятие


(function () {
  window.listeners = {};

  /* функция, которая запустится по клику по главному пину */
  var onMainPinMouseUp = function (evt) {
    /* запуск всех функций на карте(перемещение гл пина, создание пинов, активация карты*/
    window.map.makeActive(evt);
    // window.map.createAndPutAllPins();
    window.backend.dataload();
    window.movePin.addFormEventListeners();
    window.form.addFormEventListeners();
    window.backend.dataload();
    window.map.mainPinElement.removeEventListener('mouseup', onMainPinMouseUp);
  };

  window.map.mainPinElement.addEventListener('mouseup', onMainPinMouseUp);


  /* блок с удалителями слушателей на reset и submit*/
  /* функция удаляющая все слушатели, делающая все что нужно disabled и удаляющая все пины*/
  window.listeners.removeAllHandlers = function () {
    /* удаление  всех маленьких пинов*/
    var allPinsContainer = window.pin.mapElement.querySelectorAll('.map__pin');
    allPinsContainer.forEach(function (node) {
      if (!node.classList.contains('map__pin--main')) {
        node.remove();
      }
    });
    /* снятие всех обработчиков с  формы*/
    window.form.removeFormEventListeners();
    window.map.mainPinElement.removeEventListener('mouseup', onMainPinMouseUp);
    window.map.mainPinElement.addEventListener('mouseup', onMainPinMouseUp);
  };


  window.listeners.setFormNew = function () {
    window.map.fieldsetInFormContainer.forEach(function (node) {
      node.value = '';
    });
    window.map.formAdElement.reset();
    // /* координаты для главного пина в интпуте адрес и для stle самого элемента */
    // window.map.inputAddressElement.value = window.map.DEFAULT_X + ', ' + window.map.DEFAULT_Y;
    // window.map.mainPinElement.style.left = window.map.DEFAULT_X + 'px';
    // window.map.mainPinElement.style.top = window.map.DEFAULT_Y + 'px';

  };

  window.listeners.onResetButtonClick = function () {
    window.map.makeDisabled();
    window.listeners.removeAllHandlers();
    window.listeners.setFormNew();
  };

})();
