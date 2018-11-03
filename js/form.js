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
  var capacitySelect = document.querySelector('#capacity');
  var formAdElement = document.querySelector('.ad-form');
  var fieldsetInFormContainer = formAdElement.querySelectorAll('fieldset');
  var inputAddressElement = document.querySelector('#address');

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

  var DEFAULT_PRICE = '1000';
  var ROOMS_NOT_FOR_GUESTS = 100;
  window.form.setAddress = function (x, y) {
    inputAddressElement.value = x + ', ' + y;
  };

  /* деактивирует форму */
  window.form.makeFormDisabled = function () {

    formAdElement.classList.add('ad-form--disabled');

    fieldsetInFormContainer.forEach(function (node) {
      node.disabled = true;
    });
    inputAddressElement.placeholder = window.map.DEFAULT_X + ', ' + window.map.DEFAULT_Y;
  };


  /* активирует форму*/
  window.form.makeFormActive = function () {

    formAdElement.classList.remove('ad-form--disabled');

    fieldsetInFormContainer.forEach(function (node) {
      node.disabled = false;
    });
    window.form.setAddress(window.map.getCoordinateX(), window.map.getCoordinateY());
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
    priceInputElement.min = DEFAULT_PRICE;
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

  /* устанавливает кол-во гостей от кол-ва комнат*/
  var onSelectRoomNumberMouseUp = function () {

    Array.from(capacitySelect.options).forEach(function (option) {

      var selectedOptionRoom = amountRoomsSelectElement.value;
      option.disabled = false;
      var capacityValue = parseInt(option.value, 10);
      var roomsValue = parseInt(selectedOptionRoom, 10);

      if (roomsValue === ROOMS_NOT_FOR_GUESTS && capacityValue !== 0) {
        option.disabled = true;

      } else if (roomsValue !== ROOMS_NOT_FOR_GUESTS && (capacityValue > roomsValue || capacityValue === 0)) {
        option.disabled = true;

      } else {
        option.disabled = false;

      }

    });


  };

  /* функция, которая запукается при клике на сабмит
   проверка всех инпутов, очистка формы, дисэбл карты, удаление слушателей*/
  var onSubmitButtonElementClick = function () {

    if (priceInputElement.value < selectTypeElement.min) {
      selectTypeElement.setCustomValidity('Стоимость жилья должна быть не ниже ' + priceInputElement.min + ' .');
    }

    var roomSelectValue = parseInt(amountRoomsSelectElement.value, 10);
    var guestsSelectValue = parseInt(capacitySelect.value, 10);

    if (roomSelectValue === ROOMS_NOT_FOR_GUESTS && roomSelectValue !== 0) {
      capacitySelect.setCustomValidity('Количество комнат не для гостей.');
    }
    if (guestsSelectValue > roomSelectValue) {
      capacitySelect.setCustomValidity('Количество гостей должно быть не больше ' + matchAmountOfGuests[roomSelectValue] + ' .');
    } else {
      capacitySelect.setCustomValidity('');
    }

    if (formAdElement.checkValidity()) {
      window.backend.upload(new FormData(formAdElement), window.backend.onSuccessUpLoad);
      window.map.makeDisabled();
      window.form.makeFormDisabled();
      window.listeners.removeAllHandlers();
      setFormNew();
    }

  };

  var setFormNew = function () {
    fieldsetInFormContainer.forEach(function (node) {
      node.value = '';
    });
    formAdElement.reset();

  };

  var onResetButtonClick = function () {
    window.map.makeDisabled();
    window.form.makeFormDisabled();
    window.listeners.removeAllHandlers();
    setFormNew();
  };

  window.form.addFormEventListeners = function () {
    selectTypeElement.addEventListener('mouseup', onSelectTypeMouseup);
    priceInputElement.addEventListener('change', onpriceInputChange);
    priceInputElement.addEventListener('mouseup', onPriceInput);
    checkInInputElement.addEventListener('mouseup', onSelectTimeInMouseUp);
    checkOutInputElement.addEventListener('mouseup', onSelectTimeOutMouseUp);
    amountRoomsSelectElement.addEventListener('change', onSelectRoomNumberMouseUp);
    capacitySelect.addEventListener('change', onSelectRoomNumberMouseUp);
    submitButtonElement.addEventListener('click', onSubmitButtonElementClick);
    resetButtonElement.addEventListener('click', onResetButtonClick);
    submitButtonElement.addEventListener('mousedown', onSubmitButtonElementClick);
    onSelectRoomNumberMouseUp();
  };

  window.form.removeFormEventListeners = function () {
    selectTypeElement.removeEventListener('mouseup', onSelectTypeMouseup);
    priceInputElement.removeEventListener('change', onpriceInputChange);
    priceInputElement.removeEventListener('mouseup', onPriceInput);
    checkInInputElement.removeEventListener('mouseup', onSelectTimeInMouseUp);
    checkOutInputElement.removeEventListener('mouseup', onSelectTimeOutMouseUp);
    amountRoomsSelectElement.removeEventListener('change', onSelectRoomNumberMouseUp);
    submitButtonElement.removeEventListener('click', onSubmitButtonElementClick);
    resetButtonElement.removeEventListener('click', onResetButtonClick);
    submitButtonElement.removeEventListener('mousedown', onSubmitButtonElementClick);
  };

  /* координаты для главного пина в интпуте адрес и для stle самого элемента */
  window.form.setAddress(window.map.DEFAULT_X, window.map.DEFAULT_Y);
  window.form.makeFormDisabled();
})();
