/* eslint-disable eqeqeq */
'use strict';

/* КОНСТАНТЫ*/

var AMOUNT = 8;
var TYPE = ['palace', 'flat', 'house', 'bungalo'];

var TYPE_MATCH = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var TITLE = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var AVATAR_SOURCE = 'img/avatars/user0';
var PNG = '.png';


var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var MIN_AMOUT_ROOMS = 1;
var MAX_AMOUT_ROOMS = 5;

var CHECKIN = ['12:00', '13:00', '14:00'];
// var CHECKOUT = CHECKIN;

var FEATURES = ['--wifi', '--dishwasher', '--parking', '--washer', '--elevator', '--conditioner'];
var FEATURESTYLE = 'popup__feature popup__feature'; // РАСКОДИРОВАТЬ

var PHOTOS_AMOUNT = 3;
var PHOTO_SOURCE = 'http://o0.github.io/assets/images/tokyo/hotel';
var JPG = '.jpg';
var PHOTO_PLACE_WIDTH = 45; // РАСКОДИРОВАТЬ
var PHOTO_PLACE_HEIGHT = 45; // РАСКОДИРОВАТЬ

var MIN_X = 100;
var MAX_X = 1087;

var MIN_Y = 130;
var MAX_Y = 630;

var PIN_HEIGHT = 81;
var PIN_WIDTH = 50;
var PX = 'px';

/* ПЕРЕМЕННЫЕ*/
// var arrayofOffers = [];
// arrayofOffers.length = AMOUNT;
var pins = [];
/* переменные пина*/
var mapElement = document.querySelector('.map');
var templatePinElement = document.body.querySelector('#pin');
var pinTemplateElement = templatePinElement.content.querySelector('.map__pin');

// var arrayofOffers(arrayLength);
/* переменные карточки*/
var mapFiltersContainerElement = document.querySelector('.map__filters-container'); // РАСКОДИРОВАТЬ
var templateCardElement = document.body.querySelector('#card').content.querySelector('.map__card'); // РАСКОДИРОВАТЬ


/* МЕТОДЫ */

/* Возвращает рандомное число между мин и макс */
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/* перемешивает массив рандомно*/
var shuffle = function (array) {
  var clonedArray = array.slice();
  var j;
  var x;
  for (var i = clonedArray.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = clonedArray[i];
    clonedArray[i] = clonedArray[j];
    clonedArray[j] = x;
  }
  return clonedArray;
};

/* возвращает рандомно из массива значение*/
var getFromArray = function (array) {
  return array[getRandom(0, array.length - 1)];
};

/* создает адрес для изображения из начала(адрес) номера файла(совпадет с i) и конца, обозначающего формат файла*/
var createImageSource = function (i, address, formatEnd) {
  return address + (i + 1) + formatEnd;
};
/* создает массив фото и перемешивает их */
/* создает из массива(который рандомно перемешивается функцией shuffle) другой массив,
потом там есть переменная number - это рандомное число в промежутке от 0 до длины массива - 1. Потом полученный
массив обрезается тем, что ему задана длина и те элементы индекс который больше числа number не будут больше в массиве*/
var createNewArrayfromExistOne = function (array) {
  var list = shuffle(array);
  var number = getRandom(0, list.length - 1);
  list.length = number;
  return list;
};

/* создает массив фото и перемешивает их */

var createPhotosArray = function (arrayLength) {
  var photosArray = [];
  for (var i = 0; i < arrayLength; i++) {
    photosArray[i] = PHOTO_SOURCE + (i + 1) + JPG; // минус единица в индексе элемента массива дана, тк в массиве отсчет с 0, а i в цикле начинается с 1
  }
  return photosArray;
};

var createdPhotosArray = createPhotosArray(PHOTOS_AMOUNT);

/* функция создающая элемент-массив. На вход принимает цифру, которая указывает кол-во создх впоследствии эл-в*/
var createObject = function (i) {
  var element = {
    'author': {
      'avatar': createImageSource(i, AVATAR_SOURCE, PNG)
    },

    'offer': {
      'title': TITLE[i],
      'address': '',
      'price': getRandom(MIN_PRICE, MAX_PRICE),
      'type': TYPE_MATCH[TYPE[getRandom(0, TYPE.length)]],
      'rooms': getRandom(MIN_AMOUT_ROOMS, MAX_AMOUT_ROOMS),
      'guests': getRandom(1, Math.floor(Math.random() * 10)), // возвращает радномно число из из функции getRandom от 1 до любого округленного радомного
      'checkin': getFromArray(CHECKIN),
      'checkout': '',
      'features': createNewArrayfromExistOne(FEATURES),
      'description': '',
      'photos': shuffle(createdPhotosArray)
    },

    'location': {
      'x': getRandom(MIN_X, MAX_X),
      'y': getRandom(MIN_Y, MAX_Y)
    }
  };
  return element;
};

/* создает новые li на основе массива features у элемента*/
var createFeaturesAsDOM = function (element) {
  var fragmentLi = document.createDocumentFragment();
  for (var k = 0; k < element.offer.features.length; k++) {
    var newLi = document.createElement('li');
    newLi.className = FEATURESTYLE + element.offer.features[k];
    fragmentLi.appendChild(newLi);
  }
  return fragmentLi;
};

/* создает новые фото на основе массива photos у элемента*/
var createPhotosAsDom = function (element) {
  var fragmentPhotos = document.createDocumentFragment();
  for (var m = 0; m < element.offer.photos.length; m++) {
    var newPhoto = document.createElement('img');
    newPhoto.src = element.offer.photos[m];
    newPhoto.className = 'popup__photo';
    newPhoto.alt = 'Фотография жилья';
    newPhoto.width = PHOTO_PLACE_WIDTH;
    newPhoto.height = PHOTO_PLACE_HEIGHT;
    fragmentPhotos.appendChild(newPhoto);
  }
  return fragmentPhotos;
};
/* функция удаляет ноды элемента */
var removeChildrenNodes = function (list) {
  list.removeChild(list.firstChild);
};
/* создает карточку как DOM-элемент */
var createCard = function (element) {
  var cardClone = templateCardElement.cloneNode(true);
  cardClone.querySelector('.popup__title').textContent = element.offer.title;
  cardClone.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
  cardClone.querySelector('.popup__type').textContent = element.offer.type;
  cardClone.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
  cardClone.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkin;
  /* удаляет дефолтные li */
  var ListFeaturesElement = cardClone.querySelector('.popup__features');
  while (ListFeaturesElement.firstChild) {
    // ListFeaturesElement.removeChild(ListFeaturesElement.firstChild);
    removeChildrenNodes(ListFeaturesElement);
  }
  cardClone.querySelector('.popup__features').appendChild(createFeaturesAsDOM(element));
  cardClone.querySelector('.popup__description').textContent = element.offer.description;
  /* удаляет дефолтные фото */
  var ListPhotosElement = cardClone.querySelector('.popup__photos');
  while (ListPhotosElement.firstChild) {
    // ListPhotosElement.removeChild(ListPhotosElement.firstChild);
    removeChildrenNodes(ListPhotosElement);
  }
  /* вставляет фото как DOM-элемент в разметку */
  cardClone.querySelector('.popup__photos').appendChild(createPhotosAsDom(element));
  cardClone.querySelector('.popup__avatar').src = element.author.avatar;
  var cardCloseElement = cardClone.querySelector('.popup__close');
  cardCloseElement.addEventListener('click', function () {
    cardClone.classList.add('hidden');
  });
  // fragmentCard.appendChild(cardClone);
  // mapFiltersContainerElement.appendChild(fragmentCard);
  // console.log('I create Cards');
  return cardClone;
};

var drawOneCard = function (element) {
  var fragmentCard = document.createDocumentFragment();
  fragmentCard.appendChild(createCard(element));
  mapFiltersContainerElement.appendChild(fragmentCard);
  // console.log('I draw Cards');
};

/* создает один пин как элемент DOM и помещает его на карту */
var createOnePin = function (element) {
  var pinClone = pinTemplateElement.cloneNode(true);

  pinClone.style.left = element.location.x - PIN_WIDTH + PX;
  pinClone.style.top = element.location.y - PIN_HEIGHT + PX;
  pinClone.querySelector('img').src = element.author.avatar;
  pinClone.querySelector('img').alt = element.offer.avatar;
  pinClone.addEventListener('click', function () {
    drawOneCard(element);
  });
  //  console.log('I create Pins');
  return pinClone;
};

var putOnePin = function (element) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createOnePin(element));
  mapElement.appendChild(fragment);
  // console.log('I draw PIns');
};


/* вызовы функций */

/* ------------------------------------- module4-task1------------------------------------------------ */
/* карта деактивируется, при клике на главн пин снимется diabled с форм и карты, задаются координаты главного пина */
var mainPinElement = document.querySelector('.map__pin--main');
var formAdElement = document.querySelector('.ad-form');
var fieldsetInFormContainer = formAdElement.querySelectorAll('fieldset');
var inputAddressElement = document.querySelector('#address');
var FIRST_COORDINATE = 570;
var SECOND_COORDINATE = 375;
var bodyRect = mainPinElement.getBoundingClientRect();
var mapImage = mapElement.getBoundingClientRect();

/* делает все инпуты, филдсеты, баттоны неактивными, делает неактивной карту */
var makeDisabled = function () {
  mapElement.classList.add('map--faded');
  inputAddressElement.placeholder = FIRST_COORDINATE + ', ' + SECOND_COORDINATE;
  fieldsetInFormContainer.forEach(function (node) {
    node.setAttribute('disabled', true);
  });
};

var HALF_OF_WIDTH_PIN = 33;
// var PIN_HEIGHT = 81;

/* вычисляет координату по оси Х для главного пина, адаптировано под расширение окна путем вычета координат карты */
var getCoordinateX = function () {
  var firstCoordinate = bodyRect.left - mapImage.left + window.scrollX + HALF_OF_WIDTH_PIN;
  return firstCoordinate;
};
/* вычисляет координату по оси Y для главного пина*/
var getCoordinateY = function () {
  var secondCoordinate = Math.abs(bodyRect.top) + PIN_HEIGHT;
  return secondCoordinate;
};


/* активация карты(убирается класс .map--faded) и делает все инпуты, филдсеты, баттоны активными.
Вычислет координаты главного пина, создает пины объявлений */

var makeActive = function () {
  /* удаляет disabled с карты и форм*/
  mapElement.classList.remove('map--faded');
  formAdElement.classList.remove('ad-form--disabled');
  fieldsetInFormContainer.forEach(function (node) {
    node.removeAttribute('disabled');
  });
  inputAddressElement.value = getCoordinateX() + ', ' + getCoordinateY();

};

var createAndPutAllPins = function () {
  for (var i = 0; i < AMOUNT; i++) {
    pins[i] = createObject(i);
    // console.log('createObject' + i + pins[i]);
    // createOnePin(pins[i]);
    putOnePin(pins[i]);
    // console.log('I make all');
  }
};

/* запуск всех функций модуля */
makeDisabled();
mainPinElement.addEventListener('mouseup', makeActive);
var clicks = 0;
mainPinElement.onclick = function () {
  clicks += 1;
  if (clicks <= 1) {
    createAndPutAllPins();
  }
};

var onMainPinMouseUp = function (evt) {
  makeActive(evt); // устанавливает все слушатели
};
mainPinElement.addEventListener('onmouseup', onMainPinMouseUp);


/* --------------------------------module4-task2---------------------------- */
var selectTypeElement = document.querySelector('#type');
var priceInputElement = document.querySelector('#price');
var checkInInputElement = document.querySelector('#timein');
var checkOutInputElement = document.querySelector('#timeout');
var amountRoomsSelectElement = document.querySelector('#room_number');
var amountGuestsSelectElement = document.querySelector('#capacity');
var allOptionGuestsContainer = amountGuestsSelectElement.querySelectorAll('option');
var submitButtonElement = document.querySelector('.ad-form__submit');
var TYPE_PRICE = {
  Бунгало: 0,
  Квартира: 1000,
  Дом: 5000,
  Дворец: 10000
};

/* устанавливает цену за 1 ночь в зависимости от типа жилья */
var onSelectTypeMouseup = function () {
  var selectedOption = selectTypeElement.options[selectTypeElement.selectedIndex].text;
  // alert('strUser is ' + strUser);
  var priceForNight = TYPE_PRICE[selectedOption];
  priceInputElement.placeholder = priceForNight;
  priceInputElement.min = priceForNight;
};
/* устанавливает дефолтно min=1000  при смене значения в поле цена*/
var onpriceInputChange = function () {
  priceInputElement.min = '1000';
};
/* провреряет введеное заначение в поле цена и если оно меньше соответс. ему типу пишет ошибку */
var onPriceInput = function (evt) {
  var target = evt.target;
  if (target.value < selectTypeElement.min) {
    target.setCustomValidity('Стоимость жилья должна быть не ниже ' + selectTypeElement.min + ' .');
  }
};

/* устанавливает время выезда и въезда */
var onSelectTimeInMouseUp = function () {
  checkOutInputElement.selectedIndex = checkInInputElement.selectedIndex;
  // checkOutInputElement.preventDefault();
};
var onSelectTimeOutMouseUp = function () {
  checkInInputElement.selectedIndex = checkOutInputElement.selectedIndex;
  // checkInInput.preventDefault();
};

/* устанавливает кол-во гостей от кол-ва комнат*/

var onSelectRoomNumberMouseUp = function () {
  var selectedOptionRoom = amountRoomsSelectElement.options[amountRoomsSelectElement.selectedIndex];
  amountGuestsSelectElement.value = selectedOptionRoom.value === '100' ? 0 : selectedOptionRoom.value;
  allOptionGuestsContainer.forEach(function (node) {

    node.setAttribute('disabled', node.value === '100' ? 0 : (selectedOptionRoom.value < node.value));
  });

};

/* запуск всех функций */

selectTypeElement.addEventListener('mouseup', onSelectTypeMouseup);
priceInputElement.addEventListener('change', onpriceInputChange);
priceInputElement.addEventListener('mouseup', onPriceInput);
checkInInputElement.addEventListener('mouseup', onSelectTimeInMouseUp);
checkOutInputElement.addEventListener('mouseup', onSelectTimeOutMouseUp);
amountRoomsSelectElement.addEventListener('mouseup', onSelectRoomNumberMouseUp);

/* валидация формы*/

submitButtonElement.addEventListener('click', function () {
  if (priceInputElement.value < selectTypeElement.min) {
    selectTypeElement.setCustomValidity('Стоимость жилья должна быть не ниже ' + priceInputElement.min + ' .');
  }
});
/* -------------------------------------------------module5-task1---------------------------------------------------*/
// МОДУЛЬ move-pin.js здесь гл пин можно двигать и заданы ограничения для его передвижения
var TOPY = 130;
var BOTTOMY = 630;
var LEFTX = -31;
var RIGHTX = 1165;

mainPinElement.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

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

    mainPinElement.style.top = (mainPinElement.offsetTop - shift.y) + 'px';
    mainPinElement.style.left = (mainPinElement.offsetLeft - shift.x) + 'px';

    var yLine = mainPinElement.offsetTop - shift.y;
    var xLine = mainPinElement.offsetLeft - shift.x;
    inputAddressElement.value = (xLine + HALF_OF_WIDTH_PIN) + ', ' + (yLine + PIN_HEIGHT);
    checkBoundariesForPin(shift);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);


  };

  if (dragged) {
    var onClickPreventDefault = function (e) {
      e.preventDefault();
      mainPinElement.removeEventListener('click', onClickPreventDefault);
    };
    mainPinElement.addEventListener('click', onClickPreventDefault);
  }

  /* проверка на вылезание за края*/
  var checkBoundariesForPin = function (shift) {

    var currentCoordiant = {
      x: mainPinElement.offsetLeft - shift.x,
      y: mainPinElement.offsetTop - shift.y
    };
    if (currentCoordiant.x > RIGHTX) {
      mainPinElement.style.left = RIGHTX + 'px';
    } else if (currentCoordiant.x < LEFTX) {
      mainPinElement.style.left = LEFTX + 'px';
    } else if (currentCoordiant.y > BOTTOMY) {
      mainPinElement.style.top = BOTTOMY + 'px';
    } else if (currentCoordiant.y < TOPY) {
      mainPinElement.style.top = TOPY + 'px';
    }

  };

  document.addEventListener('mousemove', onMouseMove);

  document.addEventListener('mouseup', onMouseUp);

});

// поставить удалитель слушателей по reset и по submit
/* блок с удалителями слушателей на reset и submit*/
/*
var resetButton = document.querySelector('.ad-form__reset');
var deleteAllHandlers = function () {
  makeDisabled();
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
  mainPin.removeEventListener('click', onClickPreventDefault);
};
resetButton.addEventListener('mousedown', deleteAllHandlers)

*/
