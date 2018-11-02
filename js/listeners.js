'use strict';
// запуск всех слушателей по клику на гл пин и их снятие


(function () {
  window.listeners = {};

  /* функция, которая запустится по клику по главному пину */
  var onMainPinMouseUp = function (evt) {
    /* запуск всех функций на карте(перемещение гл пина, создание пинов, активация карты*/
    window.map.makeActive(evt);
    window.backend.loadData(window.map.onLoadPins);
    // window.backend.loadData(window.map.createPins);
    window.movePin.addFormEventListeners();
    window.form.addFormEventListeners();
    window.map.mainPinElement.removeEventListener('mouseup', onMainPinMouseUp);
  };

  window.map.mainPinElement.addEventListener('mouseup', onMainPinMouseUp);

  /* блок с удалителями слушателей на reset и submit*/
  /* функция удаляющая все слушатели, делающая все что нужно disabled и вызывающая функцию удаляющую все пины*/
  window.listeners.removeAllHandlers = function () {
    /* удаление  всех маленьких пинов*/
    window.map.pinsRemove();
    /* удаление карточек если они есть */
    window.map.cardsRemove();
    /* снятие всех обработчиков с  формы*/
    window.form.removeFormEventListeners();
    window.map.mainPinElement.removeEventListener('mouseup', onMainPinMouseUp);
    window.map.mainPinElement.addEventListener('mouseup', onMainPinMouseUp);
  };


  window.listeners.setFormNew = function () {
    window.form.fieldsetInFormContainer.forEach(function (node) {
      node.value = '';
    });
    window.form.formAdElement.reset();
    // /* координаты для главного пина в интпуте адрес и для stle самого элемента */
    // window.form.inputAddressElement.value = window.map.DEFAULT_X + ', ' + window.map.DEFAULT_Y;
    // window.map.mainPinElement.style.left = window.map.DEFAULT_X + 'px';
    // window.map.mainPinElement.style.top = window.map.DEFAULT_Y + 'px';

  };

  window.listeners.onResetButtonClick = function () {
    window.map.makeDisabled();
    window.listeners.removeAllHandlers();
    window.listeners.setFormNew();
    window.form.makeFormDisabled();
  };

})();
