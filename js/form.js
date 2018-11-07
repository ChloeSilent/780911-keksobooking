'use strict';
// form.js — модуль, который работает с формой, валидация и там же баттоны submit и reset


(function () {

  var DEFAULT_PRICE = '1000';
  var ROOMS_NOT_FOR_GUESTS = 100;
  var PHOTO_AVATAR_DEFAULT_IMAGE_SRC = 'img/muffin-grey.svg';

  window.form = {};

  var TypePrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var matchAmountOfGuests = {
    '1': '1',
    '2': '2',
    '3': '3',
    '100': 'Выберите, пожалуйста, опцию "не для гостей"'
  };

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
  var adFormPhotoElement = document.querySelector('.ad-form__photo-container').querySelector('.ad-form__photo');
  var avatarPhotoElement = document.querySelector('.ad-form-header__preview').querySelector('img');


  window.form.setAddress = function (x, y) {
    inputAddressElement.value = x + ', ' + y;
  };

  /* деактивирует форму */
  window.form.makeFormDisabled = function () {

    formAdElement.classList.add('ad-form--disabled');

    fieldsetInFormContainer.forEach(function (node) {
      node.disabled = true;
    });
    window.form.setAddress(window.map.getCoordinateX(), window.map.getCoordinateY());

    adFormElements.forEach(function (node) {
      node.disabled = true;
    });

    featureAdFormElements.forEach(function (node) {
      node.disabled = true;
    });

    adFormHeaderElement.disabled = true;
    dropZoneAdFormElement.disabled = true;
    submitButtonElement.disabled = true;
    resetButtonElement.disabled = true;
    adFormPhotoElement.remove();
  };


  /* активирует форму*/
  window.form.makeFormActive = function () {

    formAdElement.classList.remove('ad-form--disabled');

    fieldsetInFormContainer.forEach(function (node) {
      node.disabled = false;
    });


    window.form.setAddress(window.map.getCoordinateX(), window.map.getCoordinateY());
    adFormElements.forEach(function (node) {
      node.disabled = false;
    });

    featureAdFormElements.forEach(function (node) {
      node.disabled = false;
    });

    adFormHeaderElement.disabled = false;
    dropZoneAdFormElement.disabled = false;
    submitButtonElement.disabled = false;
    resetButtonElement.disabled = false;

    /* устанавливает дефолтно min=1000  при смене значения в поле цена*/
    priceInputElement.min = DEFAULT_PRICE;

  };

  /* устанавливает цену за 1 ночь в зависимости от типа жилья */
  var onSelectTypeChange = function () {
    var selectedOption = selectTypeElement.options[selectTypeElement.selectedIndex].value;
    var priceForNight = TypePrice[selectedOption];
    priceInputElement.placeholder = priceForNight;
    priceInputElement.min = priceForNight;
  };

  /* проверяет введеное заначение в поле цена и если оно меньше соответс. ему типу пишет ошибку */
  var onPriceInputChange = function (evt) {
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
  var onSubmitButtonElementClick = function () {

    /* проверка стоимости тип/цена*/
    var value = parseInt(priceInputElement.value, 10);
    if (TypePrice[selectTypeElement.value] > value) {
      priceInputElement.setCustomValidity('Стоимость жилья должна быть не ниже ' + TypePrice[selectTypeElement.value] + ' .');
    } else {
      priceInputElement.setCustomValidity('');
    }

    var roomSelectValue = parseInt(amountRoomsSelectElement.value, 10);
    var guestsSelectValue = parseInt(capacitySelectElement.value, 10);
    /* проверка команат и гостей */

    if (roomSelectValue === ROOMS_NOT_FOR_GUESTS && guestsSelectValue !== 0) {
      capacitySelectElement.setCustomValidity('Количество комнат не для гостей.');
    } else {
      if (guestsSelectValue > roomSelectValue) {
        capacitySelectElement.setCustomValidity('Количество гостей должно быть не больше ' + matchAmountOfGuests[roomSelectValue] + ' .');
      } else {
        capacitySelectElement.setCustomValidity('');
      }
    }

    /* проверка время выезда и заезда */
    if (checkOutSelectElement.selectedIndex !== checkSelectElement.selectedIndex) {
      checkSelectElement.setCustomValidity('Время заезда и время выезда должны совпадать.');
    } else {
      checkSelectElement.setCustomValidity('');
    }

    if (formAdElement.checkValidity()) {
      window.backend.upload(new FormData(formAdElement), window.backend.onSuccessUpLoad);
      window.map.makeDisabled();
      window.form.makeFormDisabled();
      window.listeners.removeAllHandlers();
      setFormNew();
      removeAllPhotos();
      window.filter.setFilterFormNew();
      window.filter.disableFilterForm();
    }

  };

  var setFormNew = function () {

    fieldsetInFormContainer.forEach(function (node) {
      node.value = '';
    });
    formAdElement.reset();
    window.form.setAddress(window.map.getCoordinateX(), window.map.getCoordinateY());
  };

  var removeAllPhotos = function () {
    avatarPhotoElement.src = PHOTO_AVATAR_DEFAULT_IMAGE_SRC;
    var adFormPhotoElements = document.querySelector('.ad-form__photo-container').querySelectorAll('.ad-form__photo');
    adFormPhotoElements.forEach(function (node) {
      node.remove();
    });
  };

  var onResetButtonClick = function () {
    window.map.makeDisabled();
    window.form.makeFormDisabled();
    window.listeners.removeAllHandlers();
    setFormNew();
    removeAllPhotos();
    window.filter.disableFilterForm();
    window.filter.setFilterFormNew();

  };

  window.form.addFormEventListeners = function () {
    selectTypeElement.addEventListener('change', onSelectTypeChange);
    priceInputElement.addEventListener('change', onPriceInputChange);
    checkSelectElement.addEventListener('change', onSelectTimeInChange);
    checkOutSelectElement.addEventListener('change', onSelectTimeOutChange);
    amountRoomsSelectElement.addEventListener('change', onSelectRoomNumberChange);
    capacitySelectElement.addEventListener('change', onSelectRoomNumberChange);
    resetButtonElement.addEventListener('click', onResetButtonClick);
    submitButtonElement.addEventListener('click', onSubmitButtonElementClick);
    onSelectRoomNumberChange();
  };

  window.form.removeFormEventListeners = function () {
    selectTypeElement.removeEventListener('change', onSelectTypeChange);
    priceInputElement.removeEventListener('change', onPriceInputChange);
    checkSelectElement.removeEventListener('change', onSelectTimeInChange);
    checkOutSelectElement.removeEventListener('change', onSelectTimeOutChange);
    amountRoomsSelectElement.removeEventListener('change', onSelectRoomNumberChange);
    capacitySelectElement.addEventListener('change', onSelectRoomNumberChange);
    resetButtonElement.removeEventListener('click', onResetButtonClick);
    submitButtonElement.removeEventListener('click', onSubmitButtonElementClick);
  };

  window.form.makeFormDisabled();
})();
