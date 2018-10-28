'use strict';
// map.js — модуль, который управляет карточками объявлений и пинами:
// добавляет на страницу нужную карточку,
// отрисовывает пины и осуществляет взаимодействие карточки и метки на карте
// передвигает главный пин по карте

(function () {
  window.mapElement = document.querySelector('.map');
  var mapFiltersContainerElement = document.querySelector('.map__filters-container');
  window.mapFiltersContainerElement = mapFiltersContainerElement;

  var pins = [];
  var AMOUNT = 8;
  var TOPY = 130;
  var BOTTOMY = 630;
  var LEFTX = -31;
  var RIGHTX = 1165;


  window.drawOneCard = function (element) {
    var fragmentCard = document.createDocumentFragment();
    fragmentCard.appendChild(window.card.createCard(element));
    mapFiltersContainerElement.appendChild(fragmentCard);

  };


  var putOnePin = function (element) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.pin.createOnePin(element));
    window.mapElement.appendChild(fragment);
  };


  window.mainPinElement = document.querySelector('.map__pin--main');
  window.inputAddressElement = document.querySelector('#address');
  window.DEFAULT_X = 570;
  window.DEFAULT_Y = 375;
  var bodyRect = window.mainPinElement.getBoundingClientRect();
  var mapImage = window.mapElement.getBoundingClientRect();

  /* делает все инпуты, филдсеты, баттоны неактивными, делает неактивной карту */
  window.makeDisabled = function () {
    window.mapElement.classList.add('map--faded');
    window.form.formAdElement.classList.add('ad-form--disabled');
    window.inputAddressElement.placeholder = window.DEFAULT_X + ', ' + window.DEFAULT_Y;
    window.form.fieldsetInFormContainer.forEach(function (node) {
      node.setAttribute('disabled', true);
    });
  };

  window.makeDisabled();

  var HALF_OF_WIDTH_PIN = 33;

  /* вычисляет координату по оси Х для главного пина, адаптировано под расширение окна путем вычета координат карты */
  var getCoordinateX = function () {
    return bodyRect.left - mapImage.left + window.scrollX + HALF_OF_WIDTH_PIN;

  };
  /* вычисляет координату по оси Y для главного пина*/
  var getCoordinateY = function () {
    return Math.abs(bodyRect.top) + window.pin.PIN_HEIGHT;

  };

  /* активация карты(убирается класс .map--faded) и делает все инпуты, филдсеты, баттоны активными.
  Вычислет координаты главного пина, создает пины объявлений */
  var makeActive = function () {
    /* удаляет disabled с карты и форм*/
    window.mapElement.classList.remove('map--faded');
    window.form.formAdElement.classList.remove('ad-form--disabled');
    window.form.fieldsetInFormContainer.forEach(function (node) {
      node.removeAttribute('disabled');
    });
    window.inputAddressElement.value = getCoordinateX() + ', ' + getCoordinateY();

  };

  var createAndPutAllPins = function () {
    for (var i = 0; i < AMOUNT; i++) {
      pins[i] = window.data.createObject(i);
      putOnePin(pins[i]);
    }
  };

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

      window.mainPinElement.style.top = (window.mainPinElement.offsetTop - shift.y) + 'px';
      window.mainPinElement.style.left = (window.mainPinElement.offsetLeft - shift.x) + 'px';

      var yLine = window.mainPinElement.offsetTop - shift.y;
      var xLine = window.mainPinElement.offsetLeft - shift.x;
      window.inputAddressElement.value = (xLine + HALF_OF_WIDTH_PIN) + ', ' + (yLine + window.pin.PIN_HEIGHT);
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
        window.mainPinElement.removeEventListener('click', onClickPreventDefault);
      };
      window.mainPinElement.addEventListener('click', onClickPreventDefault);
    }

    /* проверка на вылезание за края*/
    var checkBoundariesForPin = function (shift) {

      var currentCoordiant = {
        x: window.mainPinElement.offsetLeft - shift.x,
        y: window.mainPinElement.offsetTop - shift.y
      };
      if (currentCoordiant.x > RIGHTX) {
        window.mainPinElement.style.left = RIGHTX + 'px';
      } else if (currentCoordiant.x < LEFTX) {
        window.mainPinElement.style.left = LEFTX + 'px';
      } else if (currentCoordiant.y > BOTTOMY) {
        window.mainPinElement.style.top = BOTTOMY + 'px';
      } else if (currentCoordiant.y < TOPY) {
        window.mainPinElement.style.top = TOPY + 'px';
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  /* функция, которая запустится по клику по главному пину */
  var onMainPinMouseUp = function (evt) {
    /* запуск всех функций на карте(перемещение гл пина, создание пинов, активация карты*/
    makeActive(evt);
    createAndPutAllPins();
    window.mainPinElement.addEventListener('mousedown', onMainPinElementMouseDown);
    /* запуск всех функций формы*/
    window.form.selectTypeElement.addEventListener('mouseup', window.form.onSelectTypeMouseup);
    window.form.priceInputElement.addEventListener('change', window.form.onpriceInputChange);
    window.form.priceInputElement.addEventListener('mouseup', window.form.onPriceInput);
    window.form.checkInInputElement.addEventListener('mouseup', window.form.onSelectTimeInMouseUp);
    window.form.checkOutInputElement.addEventListener('mouseup', window.form.onSelectTimeOutMouseUp);
    window.form.amountRoomsSelectElement.addEventListener('change', window.form.onSelectRoomNumberMouseUp);
    window.mainPinElement.removeEventListener('mouseup', onMainPinMouseUp);
    window.form.submitButtonElement.addEventListener('click', window.form.onSbmitButtonElementClick);
    window.form.resetButtonElement.addEventListener('click', window.form.onResetButtonClick);
    window.form.submitButtonElement.addEventListener('mousedown', window.form.onSbmitButtonElementClick);
  };
  window.mainPinElement.addEventListener('mouseup', onMainPinMouseUp);
})();
