'use strict';
// form.js — модуль, который работает с формой, валидация и там же баттоны submit и reset


(function () {
  window.formAdElement = document.querySelector('.ad-form');
  window.fieldsetInFormContainer = window.formAdElement.querySelectorAll('fieldset');
  window.selectTypeElement = document.querySelector('#type');
  window.priceInputElement = document.querySelector('#price');
  window.checkInInputElement = document.querySelector('#timein');
  window.checkOutInputElement = document.querySelector('#timeout');
  window.amountRoomsSelectElement = document.querySelector('#room_number');
  window.submitButtonElement = document.querySelector('.ad-form__submit');
  window.resetButtonElement = document.querySelector('.ad-form__reset');
  var TYPE_PRICE = {
    Бунгало: 0,
    Квартира: 1000,
    Дом: 5000,
    Дворец: 10000
  };

  /* устанавливает цену за 1 ночь в зависимости от типа жилья */
  window.onSelectTypeMouseup = function () {
    var selectedOption = window.selectTypeElement.options[window.selectTypeElement.selectedIndex].text;
    var priceForNight = TYPE_PRICE[selectedOption];
    window.priceInputElement.placeholder = priceForNight;
    window.priceInputElement.min = priceForNight;
  };
  /* устанавливает дефолтно min=1000  при смене значения в поле цена*/
  window.onpriceInputChange = function () {
    window.priceInputElement.min = '1000';
  };
  /* проверяет введеное заначение в поле цена и если оно меньше соответс. ему типу пишет ошибку */
  window.onPriceInput = function (evt) {
    var target = evt.target;
    if (target.value < window.selectTypeElement.min) {
      target.setCustomValidity('Стоимость жилья должна быть не ниже ' + window.selectTypeElement.min + ' .');
    }
  };

  /* устанавливает время выезда и въезда */
  window.onSelectTimeInMouseUp = function () {
    window.checkOutInputElement.selectedIndex = window.checkInInputElement.selectedIndex;

  };
  window.onSelectTimeOutMouseUp = function () {
    window.checkInInputElement.selectedIndex = window.checkOutInputElement.selectedIndex;

  };
  var selectedOptionRoom = window.amountRoomsSelectElement.value;

  var capacitySelect = document.querySelector('#capacity');

  var roomsValue = parseInt(selectedOptionRoom, 10);

  /* устанавливает кол-во гостей от кол-ва комнат*/
  window.onSelectRoomNumberMouseUp = function () {

    Array.from(capacitySelect.options).forEach(function (option) {
      var capacityValue = parseInt(option.value, 10);
      if (roomsValue === 100 && capacityValue !== 0) {
        option.disabled = true;
      } else if (roomsValue !== 100 && (capacityValue > roomsValue || capacityValue === 0)) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }

    });


  };

  /* валидация формы*/
  window.onSbmitButtonElementClick = function (e) {
    var succesMessageClone = document.querySelector('#success').cloneNode(true);
    var errorMessageClone = document.querySelector('#error').cloneNode(true);
    var mainElement = document.querySelector('main');
    var fragment = document.createDocumentFragment();
    e.preventDefault();
    window.map.makeDisabled();
    removeAllHandlers();
    setFormNew();

    window.formAdElement.addEventListener('invalid', function () {
      fragment.appendChild(errorMessageClone);
      mainElement.appendChild(fragment);
    });
    window.formAdElement.addEventListener('valid', function () {
      fragment.appendChild(succesMessageClone);
      mainElement.appendChild(fragment);
    });

    if (window.priceInputElement.value < window.selectTypeElement.min) { //  вынести в отдельную ф-ю, вызывать ее на 462 строке, если она вернет false, сразу выходить (return) из onSbmitButtonElementClick
      window.selectTypeElement.setCustomValidity('Стоимость жилья должна быть не ниже ' + window.priceInputElement.min + ' .'); // вынести в отдельную ф-ю, вызывать ее на 462 строке, если она вернет false, сразу выходить (return) из onSbmitButtonElementClick
    }
    var matchAmountOfGuests = {

      '1': '1',
      '2': '2',
      '3': '3',
      '100': 'Выберите, пожалуйста, опцию "не для гостей"'
    };
    if (capacitySelect.value > roomsValue) { //  вынести в отдельную ф-ю, вызывать ее на 462 строке, если она вернет false, сразу выходить (return) из onSbmitButtonElementClick
      window.selectTypeElement.setCustomValidity('Количество гостей должно быть не больше ' + matchAmountOfGuests[roomsValue] + ' .'); // вынести в отдельную ф-ю, вызывать ее на 462 строке, если она вернет false, сразу выходить (return) из onSbmitButtonElementClick
    }
  };


  var removeAllHandlers = function () {
    /* удаление  всех маленьких пинов*/
    var allPinsContainer = window.map.mapElement.querySelectorAll('.map__pin');
    allPinsContainer.forEach(function (node) {
      if (!node.classList.contains('map__pin--main')) {
        node.remove();
      }
    });
    /* снятие всех обработчиков с  формы*/
    window.selectTypeElement.removeEventListener('mouseup', window.onSelectTypeMouseup);
    window.priceInputElement.removeEventListener('change', window.onpriceInputChange);
    window.priceInputElement.removeEventListener('mouseup', window.onPriceInput);
    window.checkInInputElement.removeEventListener('mouseup', window.onSelectTimeInMouseUp);
    window.checkOutInputElement.removeEventListener('mouseup', window.onSelectTimeOutMouseUp);
    window.amountRoomsSelectElement.removeEventListener('mouseup', window.onSelectRoomNumberMouseUp);
    window.map.mainPinElement.removeEventListener('mouseup', window.map.onMainPinMouseUp);
    window.resetButtonElement.removeEventListener('click', window.onResetButtonClick);
    window.submitButtonElement.removeEventListener('mousedown', window.onSbmitButtonElementClick);
  };
  var setFormNew = function () {
    window.fieldsetInFormContainer.forEach(function (node) {
      node.value = '';
    });
    window.formAdElement.reset();
    /* координаты для главного пина в интпуте адрес и для stle самого элемента */
    window.map.inputAddressElement.value = window.map.DEFAULT_X + ', ' + window.map.DEFAULT_Y;
    window.map.mainPinElement.style.left = window.map.DEFAULT_X + 'px';
    window.map.mainPinElement.style.top = window.map.DEFAULT_Y + 'px';

  };

  window.onResetButtonClick = function () {
    window.map.makeDisabled();
    removeAllHandlers();
    setFormNew();
  };


})();
