'use strict';
// модуль, передвижения главного пина,заданы ограничения для его передвижения и задаются его координаты для формы

(function () {


  var TOP_Y = 130;
  var BOTTOM_Y = 630;
  var LEFT_X = -31;
  var RIGHT_X = 1165;

  window.movePin = {};

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

      var pinCoords = {
        x: mainPin.offsetLeft,
        y: mainPin.offsetTop,
      };

      var newX = pinCoords.x - shift.x;

      if (LEFT_X < newX && newX < RIGHT_X) {
        pinCoords.x -= shift.x;
        startCoords.x -= shift.x;
      }

      var newY = pinCoords.y - shift.y;

      if (TOP_Y < newY && newY < BOTTOM_Y) {
        pinCoords.y -= shift.y;
        startCoords.y -= shift.y;
      }


      window.form.setAddress(window.map.getCoordinateX(), window.map.getCoordinateY());
      /* вычисляет координату по оси Х для главного пина, адаптировано под расширение окна путем вычета координат карты */


      mainPin.style.left = pinCoords.x + 'px';
      mainPin.style.top = pinCoords.y + 'px';

      window.form.setAddress(window.map.getCoordinateX(), window.map.getCoordinateY());
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

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.movePin.addFormEventListeners = function () {
    mainPin.addEventListener('mousedown', onMainPinElementMouseDown);
  };


})();
