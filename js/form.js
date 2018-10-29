'use strict';
// form.js — модуль, который работает с формой, валидация и там же баттоны submit и reset


(function () {

  window.form = {};

  var selectTypeElement = document.querySelector('#type');
  var priceInputElement = document.querySelector('#price');
  var checkInInputElement = document.querySelector('#timein');
  var checkOutInputElement = document.querySelector('#timeout');
  var amountRoomsSelectElement = document.querySelector('#room_number');
  var submitButtonElement = document.querySelector('.ad-form__submit');
  var resetButtonElement = document.querySelector('.ad-form__reset');

  var TYPE_PRICE = {
    Бунгало: 0,
    Квартира: 1000,
    Дом: 5000,
    Дворец: 10000
  };

  var matchAmountOfGuests = {
    '1': '1',
    '2': '2',
    '3': '3',
    '100': 'Выберите, пожалуйста, опцию "не для гостей"'
  };

  /* устанавливает цену за 1 ночь в зависимости от типа жилья */
  var onSelectTypeMouseup = function () {
    var selectedOption = selectTypeElement.options[selectTypeElement.selectedIndex].text;
    var priceForNight = TYPE_PRICE[selectedOption];
    priceInputElement.placeholder = priceForNight;
    priceInputElement.min = priceForNight;
  };
  /* устанавливает дефолтно min=1000  при смене значения в поле цена*/
  var onpriceInputChange = function () {
    priceInputElement.min = '1000';
  };
  /* проверяет введеное заначение в поле цена и если оно меньше соответс. ему типу пишет ошибку */
  var onPriceInput = function (evt) {
    var target = evt.target;
    if (target.value < selectTypeElement.min) {
      target.setCustomValidity('Стоимость жилья должна быть не ниже ' + selectTypeElement.min + ' .');
    }
  };

  /* устанавливает время выезда и въезда */
  var onSelectTimeInMouseUp = function () {
    checkOutInputElement.selectedIndex = checkInInputElement.selectedIndex;

  };
  var onSelectTimeOutMouseUp = function () {
    checkInInputElement.selectedIndex = checkOutInputElement.selectedIndex;

  };
  var selectedOptionRoom = amountRoomsSelectElement.value;

  var capacitySelect = document.querySelector('#capacity');

  /* устанавливает кол-во гостей от кол-ва комнат*/
  var onSelectRoomNumberMouseUp = function () {

    Array.from(capacitySelect.options).forEach(function (option) {
      var capacityValue = parseInt(option.value, 10);
      var roomsValue = parseInt(selectedOptionRoom, 10);
      if (roomsValue === 100 && capacityValue !== 0) {
        option.disabled = true;
      } else if (roomsValue !== 100 && (capacityValue > roomsValue || capacityValue === 0)) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }

    });


  };

  /* функция, которая запукается при клике на сабмит
   проверка всех инпутов, очистка формы, дисэбл карты, удаление слушателей*/
  var onSbmitButtonElementClick = function (e) {
    var succesMessageClone = document.querySelector('#success').cloneNode(true);
    var errorMessageClone = document.querySelector('#error').cloneNode(true);
    var mainElement = document.querySelector('main');
    var fragment = document.createDocumentFragment();
    e.preventDefault();

    if (priceInputElement.value < selectTypeElement.min) { //  вынести в отдельную ф-ю, вызывать ее на 462 строке, если она вернет false, сразу выходить (return) из onSbmitButtonElementClick
      selectTypeElement.setCustomValidity('Стоимость жилья должна быть не ниже ' + priceInputElement.min + ' .'); // вынести в отдельную ф-ю, вызывать ее на 462 строке, если она вернет false, сразу выходить (return) из onSbmitButtonElementClick
    }

    var roomSelectValue = parseInt(document.querySelector('#room_number').value, 10);
    var guestsSelectValue = parseInt(document.querySelector('#capacity').value, 10);
    if (roomSelectValue === 100 && roomSelectValue !== 0) {
      selectTypeElement.setCustomValidity('Количество комнат не для гостей.');
    }
    if (guestsSelectValue > roomSelectValue) { //  вынести в отдельную ф-ю, вызывать ее на 462 строке, если она вернет false, сразу выходить (return) из onSbmitButtonElementClick
      selectTypeElement.setCustomValidity('Количество гостей должно быть не больше ' + matchAmountOfGuests[roomSelectValue] + ' .'); // вынести в отдельную ф-ю, вызывать ее на 462 строке, если она вернет false, сразу выходить (return) из onSbmitButtonElementClick
    }

    window.map.makeDisabled();
    window.listeners.removeAllHandlers();
    window.listeners.setFormNew();

    window.map.formAdElement.addEventListener('invalid', function () {
      fragment.appendChild(errorMessageClone);
      mainElement.appendChild(fragment);
    });
    window.map.formAdElement.addEventListener('valid', function () {
      fragment.appendChild(succesMessageClone);
      mainElement.appendChild(fragment);
    });
  };


  window.form.addFormEventListeners = function () {
    selectTypeElement.addEventListener('mouseup', onSelectTypeMouseup);
    priceInputElement.addEventListener('change', onpriceInputChange);
    priceInputElement.addEventListener('mouseup', onPriceInput);
    checkInInputElement.addEventListener('mouseup', onSelectTimeInMouseUp);
    checkOutInputElement.addEventListener('mouseup', onSelectTimeOutMouseUp);
    amountRoomsSelectElement.addEventListener('change', onSelectRoomNumberMouseUp);
    submitButtonElement.addEventListener('click', onSbmitButtonElementClick);
    resetButtonElement.addEventListener('click', window.listeners.onResetButtonClick);
    submitButtonElement.addEventListener('mousedown', onSbmitButtonElementClick);
  };

  window.form.removeFormEventListeners = function () {
    selectTypeElement.removeEventListener('mouseup', onSelectTypeMouseup);
    priceInputElement.removeEventListener('change', onpriceInputChange);
    priceInputElement.removeEventListener('mouseup', onPriceInput);
    checkInInputElement.removeEventListener('mouseup', onSelectTimeInMouseUp);
    checkOutInputElement.removeEventListener('mouseup', onSelectTimeOutMouseUp);
    amountRoomsSelectElement.removeEventListener('change', onSelectRoomNumberMouseUp);
    submitButtonElement.removeEventListener('click', onSbmitButtonElementClick);
    resetButtonElement.removeEventListener('click', window.listeners.onResetButtonClick);
    submitButtonElement.removeEventListener('mousedown', onSbmitButtonElementClick);
  };

})();
