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
  /* координаты для главного пина в интпуте адрес и для stle самого элемента */
  window.map.inputAddressElement.value = window.map.DEFAULT_X + ', ' + window.map.DEFAULT_Y;

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
    // alert();

  };
  var onSelectTimeOutMouseUp = function () {
    checkInInputElement.selectedIndex = checkOutInputElement.selectedIndex;

  };


  var capacitySelect = document.querySelector('#capacity');

  /* устанавливает кол-во гостей от кол-ва комнат*/
  var onSelectRoomNumberMouseUp = function () {

    Array.from(capacitySelect.options).forEach(function (option) {

      var selectedOptionRoom = amountRoomsSelectElement.value;
      option.disabled = false;
      var capacityValue = parseInt(option.value, 10);
      var roomsValue = parseInt(selectedOptionRoom, 10);

      if (roomsValue === 100 && capacityValue !== 0) {
        option.disabled = true;
        // console.log('100');
      } else if (roomsValue !== 100 && (capacityValue > roomsValue || capacityValue === 0)) {
        option.disabled = true;
        // console.log(' not 100');
      } else {
        option.disabled = false;
        // console.log('smt else');
      }

    });


  };


  /* функция, которая запукается при клике на сабмит
   проверка всех инпутов, очистка формы, дисэбл карты, удаление слушателей*/
  var onSubmitButtonElementClick = function () {
    // var succesMessageClone = document.querySelector('#success').cloneNode(true);
    // var errorMessageClone = document.querySelector('#error').cloneNode(true);
    // var mainElement = document.querySelector('main');
    // var fragment = document.createDocumentFragment();

    // alert('click on Submit');

    if (priceInputElement.value < selectTypeElement.min) {
      selectTypeElement.setCustomValidity('Стоимость жилья должна быть не ниже ' + priceInputElement.min + ' .');
    }

    var roomSelectValue = parseInt(amountRoomsSelectElement.value, 10);
    var guestsSelectValue = parseInt(capacitySelect.value, 10);

    if (roomSelectValue === 100 && roomSelectValue !== 0) {
      capacitySelect.setCustomValidity('Количество комнат не для гостей.');
    }
    if (guestsSelectValue > roomSelectValue) {
      capacitySelect.setCustomValidity('Количество гостей должно быть не больше ' + matchAmountOfGuests[roomSelectValue] + ' .');
    } else {
      capacitySelect.setCustomValidity('');
    }
    // console.log('guests is ' + guestsSelectValue);
    // console.log('room is ' + roomSelectValue);
    if (document.querySelector('.ad-form').checkValidity()) {
      window.map.makeDisabled();
      window.listeners.removeAllHandlers();
      window.listeners.setFormNew();
    }


    /* --------------------------------------------------*/
    // e.preventDefault();
    // window.map.makeDisabled();
    // window.listeners.removeAllHandlers();
    // window.listeners.setFormNew();
    // window.map.formAdElement.addEventListener('invalid', function () {
    //   fragment.appendChild(errorMessageClone);
    //   mainElement.appendChild(fragment);
    // });
    // window.map.formAdElement.addEventListener('valid', function () {
    //   fragment.appendChild(succesMessageClone);
    //   mainElement.appendChild(fragment);
    // });
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
    resetButtonElement.addEventListener('click', window.listeners.onResetButtonClick);
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
    // capacitySelect.removeEventListener('change', onSelectRoomNumberMouseUp);
    submitButtonElement.removeEventListener('click', onSubmitButtonElementClick);
    resetButtonElement.removeEventListener('click', window.listeners.onResetButtonClick);
    submitButtonElement.removeEventListener('mousedown', onSubmitButtonElementClick);
  };

  var mainElement = document.querySelector('main');
  var fragment = document.createDocumentFragment();


  var successHandler = function () {

    var succesMessageClone = document.querySelector('#success').cloneNode(true);

    fragment.appendChild(succesMessageClone);
    mainElement.appendChild(fragment);
  };

  var errorHandler = function () {

    var errorMessageClone = document.querySelector('#error').cloneNode(true);
    fragment.appendChild(errorMessageClone);
    mainElement.appendChild(fragment);
  };

  window.backend.load(successHandler, errorHandler);
})();
