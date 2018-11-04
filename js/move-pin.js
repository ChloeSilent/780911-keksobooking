'use strict';
// модуль, передвижения главного пина,заданы ограничения для его передвижения и задаются его координаты для формы


(function () {

  window.movePin = {};

  var TOP_Y = 130;
  var BOTTOM_Y = 630;
  var LEFT_X = -31;
  var RIGHT_X = 1165;
  var mainPin = window.map.mainPinElement;

  /* функция передвижение главного пина*/
  var onMainPinElementMouseDown = function (evt) {
    evt.preventDefault();

    /* стартовые координаты главного пина*/
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    /* функция перемещения главного пина*/
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      var yLine = mainPin.offsetTop - shift.y;
      var xLine = mainPin.offsetLeft - shift.x;

      window.form.setAddress((xLine + window.map.HALF_OF_WIDTH_PIN), (yLine + window.pin.PIN_HEIGHT));
      checkBoundariesForPin(shift);
    };

    /* отпуск клавиши мыши снимает обработчики, запускающие перемещение пина и этой же функции*/
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    if (dragged) {
      var onClickPreventDefault = function (e) {
        e.preventDefault();
        mainPin.removeEventListener('click', onClickPreventDefault);
      };
      mainPin.addEventListener('click', onClickPreventDefault);
    }

    /* проверка на вылезание за края*/
    var checkBoundariesForPin = function (shift) {

      var currentCoordiant = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };
      if (currentCoordiant.x > RIGHT_X) {
        mainPin.style.left = RIGHT_X + 'px';
      }
      if (currentCoordiant.x < LEFT_X) {
        mainPin.style.left = LEFT_X + 'px';
      }
      if (currentCoordiant.y > BOTTOM_Y) {
        mainPin.style.top = BOTTOM_Y + 'px';
      }
      if (currentCoordiant.y < TOP_Y) {
        mainPin.style.top = TOP_Y + 'px';
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.movePin.addFormEventListeners = function () {
    mainPin.addEventListener('mousedown', onMainPinElementMouseDown);
  };


})();
