'use strict';
// form.js — модуль, который работает с формой, валидация и там же баттоны submit и reset


(function () {

  window.form = {};

  var TypePrice = {
    Бунгало: 0,
    Квартира: 1000,
    Дом: 5000,
    Дворец: 10000
  };

  var DEFAULT_PRICE = '1000';
  var ROOMS_NOT_FOR_GUESTS = 100;

  var selectTypeElement = document.querySelector('#type');
  var priceInputElement = document.querySelector('#price');
  var checkSelectElement = document.querySelector('#timein');
  var checkOutSelectElement = document.querySelector('#timeout');
  var amountRoomsSelectElement = document.querySelector('#room_number');
  var submitButtonElement = document.querySelector('.ad-form__submit');
  var resetButtonElement = document.querySelector('.ad-form__reset');
  var capacitySelectElement = document.querySelector('#capacity');
  var formAdElement = document.querySelector('.ad-form');
  var fieldsetInFormContainer = formAdElement.querySelectorAll('fieldset');
  var inputAddressElement = document.querySelector('#address');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var adFormHeaderElement = document.querySelector('.ad-form-header__drop-zone');
  var featureAdFormElements = document.querySelectorAll('.feature');
  var dropZoneAdFormElement = document.querySelector('.ad-form__drop-zone');

  var matchAmountOfGuests = {
    '1': '1',
    '2': '2',
    '3': '3',
    '100': 'Выберите, пожалуйста, опцию "не для гостей"'
  };


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

    adFormHeaderElement.classList.add('ad-form-header__drop-zone_no_hover');

    adFormElements.forEach(function (node) {
      node.classList.add('no_hover');
    });

    featureAdFormElements.forEach(function (node) {
      node.classList.add('feature_no_hover');
    });

    dropZoneAdFormElement.classList.add('ad-form__drop-zone_no_hover');
    submitButtonElement.classList.add('ad-form__submit_no-hover');
    resetButtonElement.classList.add('ad-form__submit_no-hover');
  };


  /* активирует форму*/
  window.form.makeFormActive = function () {

    formAdElement.classList.remove('ad-form--disabled');

    fieldsetInFormContainer.forEach(function (node) {
      node.disabled = false;
    });
    window.form.setAddress(window.map.getCoordinateX(), window.map.getCoordinateY());

    adFormElements.forEach(function (node) {
      node.classList.remove('no_hover');
    });
    adFormHeaderElement.classList.remove('ad-form-header__drop-zone_no_hover');

    adFormElements.forEach(function (node) {
      node.classList.remove('no_hover');
    });

    featureAdFormElements.forEach(function (node) {
      node.classList.remove('feature_no_hover');
    });

    dropZoneAdFormElement.classList.remove('ad-form__drop-zone_no_hover');
    submitButtonElement.classList.remove('ad-form__submit_no-hover');
    resetButtonElement.classList.remove('ad-form__submit_no-hover');
  };

  /* устанавливает цену за 1 ночь в зависимости от типа жилья */
  var onSelectTypeMouseup = function () {
    var selectedOption = selectTypeElement.options[selectTypeElement.selectedIndex].text;
    var priceForNight = TypePrice[selectedOption];
    priceInputElement.placeholder = priceForNight;
    priceInputElement.min = priceForNight;
  };
  /* устанавливает дефолтно min=1000  при смене значения в поле цена*/
  var onpriceInputChange = function () {
    priceInputElement.min = DEFAULT_PRICE;
  };
  /* проверяет введеное заначение в поле цена и если оно меньше соответс. ему типу пишет ошибку */
  var onPriceInputMouseup = function (evt) {
    var target = evt.target;
    if (target.value < selectTypeElement.min) {
      target.setCustomValidity('Стоимость жилья должна быть не ниже ' + selectTypeElement.min + ' .');
    }
  };

  /* устанавливает время выезда и въезда */
  var onSelectTimeInChange = function () {
    checkOutSelectElement.selectedIndex = checkSelectElement.selectedIndex;

  };
  var onSelectTimeOutChange = function () {
    checkSelectElement.selectedIndex = checkOutSelectElement.selectedIndex;

  };

  /* устанавливает кол-во гостей от кол-ва комнат*/
  var onSelectRoomNumberChange = function () {

    Array.from(capacitySelectElement.options).forEach(function (option) {

      var selectedOptionRoom = amountRoomsSelectElement.value;
      option.disabled = false;
      var capacityValue = parseInt(option.value, 10);
      var roomsValue = parseInt(selectedOptionRoom, 10);

      if (roomsValue === ROOMS_NOT_FOR_GUESTS && capacityValue !== 0) {
        option.disabled = true;
      }
      if (roomsValue !== ROOMS_NOT_FOR_GUESTS && (capacityValue > roomsValue || capacityValue === 0)) {
        option.disabled = true;
      }

    });


  };

  /* функция, которая запукается при клике на сабмит
   проверка всех инпутов, очистка формы, дисэбл карты, удаление слушателей*/
  var onSubmitButtonElementMouseDown = function () {

    if (priceInputElement.value < selectTypeElement.min) {
      selectTypeElement.setCustomValidity('Стоимость жилья должна быть не ниже ' + priceInputElement.min + ' .');
    }

    var roomSelectValue = parseInt(amountRoomsSelectElement.value, 10);
    var guestsSelectValue = parseInt(capacitySelectElement.value, 10);

    if (roomSelectValue === ROOMS_NOT_FOR_GUESTS && roomSelectValue !== 0) {
      capacitySelectElement.setCustomValidity('Количество комнат не для гостей.');
    }
    if (guestsSelectValue > roomSelectValue) {
      capacitySelectElement.setCustomValidity('Количество гостей должно быть не больше ' + matchAmountOfGuests[roomSelectValue] + ' .');
    } else {
      capacitySelectElement.setCustomValidity('');
    }

    if (checkOutSelectElement.selectedIndex !== checkSelectElement.selectedIndex) {
      checkSelectElement.setCustomValidity('Время заезда и время выезда должны совпадать.');
    }

    if (formAdElement.checkValidity()) {
      window.backend.upload(new FormData(formAdElement), window.backend.onSuccessUpLoad);
      window.map.makeDisabled();
      window.form.makeFormDisabled();
      window.listeners.removeAllHandlers();
      setFormNew();
      window.filter.setFilterFormNew();
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
    window.filter.setFilterFormNew();
  };

  window.form.addFormEventListeners = function () {
    selectTypeElement.addEventListener('mouseup', onSelectTypeMouseup);
    priceInputElement.addEventListener('change', onpriceInputChange);
    priceInputElement.addEventListener('mouseup', onPriceInputMouseup);
    // checkSelectElement.addEventListener('mouseup', onSelectTimeInChange);
    // checkOutSelectElement.addEventListener('mouseup', onSelectTimeOutChange);
    checkSelectElement.addEventListener('change', onSelectTimeInChange);
    checkOutSelectElement.addEventListener('change', onSelectTimeOutChange);
    amountRoomsSelectElement.addEventListener('change', onSelectRoomNumberChange);
    capacitySelectElement.addEventListener('change', onSelectRoomNumberChange);
    resetButtonElement.addEventListener('click', onResetButtonClick);
    submitButtonElement.addEventListener('mousedown', onSubmitButtonElementMouseDown);
    onSelectRoomNumberChange();
  };

  window.form.removeFormEventListeners = function () {
    selectTypeElement.removeEventListener('mouseup', onSelectTypeMouseup);
    priceInputElement.removeEventListener('change', onpriceInputChange);
    priceInputElement.removeEventListener('mouseup', onPriceInputMouseup);
    // checkSelectElement.removeEventListener('mouseup', onSelectTimeInChange);
    // checkOutSelectElement.removeEventListener('mouseup', onSelectTimeOutChange);
    checkSelectElement.removeEventListener('change', onSelectTimeInChange);
    checkOutSelectElement.removeEventListener('change', onSelectTimeOutChange);
    amountRoomsSelectElement.removeEventListener('change', onSelectRoomNumberChange);
    resetButtonElement.removeEventListener('click', onResetButtonClick);
    submitButtonElement.removeEventListener('mousedown', onSubmitButtonElementMouseDown);
  };

  /* координаты для главного пина в интпуте адрес и для stle самого элемента */
  window.form.setAddress(window.map.DEFAULT_X, window.map.DEFAULT_Y);
  window.form.makeFormDisabled();
})();
