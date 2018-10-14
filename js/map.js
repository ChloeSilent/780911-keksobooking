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
var CHECKOUT = CHECKIN;

var FEATURES = ['--wifi', '--dishwasher', '--parking', '--washer', '--elevator', '--conditioner'];
// var FEATURESTYLE = 'popup__feature popup__feature'; // РАСКОДИРОВАТЬ

var PHOTOS_AMOUNT = 3;
var PHOTO_SOURCE = 'http://o0.github.io/assets/images/tokyo/hotel';
var JPG = '.jpg';
// var PHOTO_PLACE_WIDTH = 45; // РАСКОДИРОВАТЬ
// var PHOTO_PLACE_HEIGHT = 45; // РАСКОДИРОВАТЬ

var MIN_X = 100;
var MAX_X = 1087;

var MIN_Y = 130;
var MAX_Y = 630;

var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var PX = 'px';

/* ПЕРЕМЕННЫЕ*/
var newArray = [];
newArray.length = AMOUNT;
var pins = [];
/* переменные пина*/
var wherePutPin = document.querySelector('.map');
var templatePin = document.body.querySelector('#pin');
var pin = templatePin.content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
// var newArray = Array(AMOUNT);
/* переменные карточки*/
// var wherePutCard = document.querySelector('.map__filters-container'); // РАСКОДИРОВАТЬ
// var templateCard = document.body.querySelector('#card').content.querySelector('.map__card'); // РАСКОДИРОВАТЬ
// var fragmentCard = document.createDocumentFragment();

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
  // console.log('featuresArray is ');
  // console.log(featuresArray);
  return clonedArray;
};

/* возвращает рандомно из массива значение*/
var getFromArray = function (array) {
  return array[getRandom(0, array.length)];
};

/* создает адрес для изображения из начала(адрес) номера файла(совпадет с i) и конца, обозначающего формат файла*/
var createImageSource = function (i, address, formatEnd) {
  return address + (i + 1) + formatEnd;
};
/* создает массив фото и перемешивает их */
/* создает из массива(который рандомно перемешивается функцией shuffle) другой массив, посредством указания его длины*/
var createNewArrayfromExistOne = function (array) {

  var list = shuffle(array);
  var number = getRandom(0, list.length);
  list.length = number;
  // console.log('popupFeauturesList is ');
  // console.log(popupFeauturesList);

  return list;
};

/* создает массив фото и перемешивает их */
// var createPhotosArray = function () {
//   var photosArray = [];
//   for (var i = 0; i < 3; i++) {
//     photosArray[i] = PHOTO_SOURCE + (i + 1) + JPG; // минус единица в индексе элемента массива дана, тк в массиве отсчет с 0, а i в цикле начинается с 1
//   }
//   return photosArray;
// };

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
      'checkout': getFromArray(CHECKOUT),
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


/* создает один пин как элемент DOM и помещает его на карту */
var createAndPutOnePin = function (element) {
  // element = createObject(i);
  var pinClone = pin.cloneNode(true);

  pinClone.style.left = element.location.x - PIN_WIDTH + PX;
  pinClone.style.top = element.location.y - PIN_HEIGHT + PX;
  pinClone.querySelector('img').src = element.author.avatar;
  pinClone.querySelector('img').alt = element.offer.avatar;

  fragment.appendChild(pinClone);
  wherePutPin.appendChild(fragment);
};

/* создает новые li на основе массива features у элемента*/
// РАСКОДИРОВАТЬ ВЕСЬ createFeaturesAsDOM
// var createFeaturesAsDOM = function (element) {
//   // ar element = createObject(i);
//   var fragmentLi = document.createDocumentFragment();
//   for (var k = 0; k < element.offer.features.length; k++) {
//     var newLi = document.createElement('li');
//     newLi.className = FEATURESTYLE + element.offer.features[k];
//     fragmentLi.appendChild(newLi);
//   }
//   return fragmentLi;
// };
/* создает новые фото на основе массива photos у элемента*/
// РАСКОДИРОВАТЬ ВЕСЬ createPhotosAsDom
// var createPhotosAsDom = function (element) {
//   var fragmentPhotos = document.createDocumentFragment();
//   for (var m = 0; m < element.offer.photos.length; m++) {
//     var newPhoto = document.createElement('img');
//     newPhoto.src = element.offer.photos[m];
//     newPhoto.className = 'popup__photo';
//     newPhoto.alt = 'Фотография жилья';
//     newPhoto.width = PHOTO_PLACE_WIDTH;
//     newPhoto.height = PHOTO_PLACE_HEIGHT;
//     fragmentPhotos.appendChild(newPhoto);
//   }
//   return fragmentPhotos;
// };

/* создает карточку как DOM-элемент */
// РАСКОДИРОВАТЬ ОТ var createCard ДО wherePutCard.appendChild(fragmentCard);
// var createCard = function (element) {

//   var cardClone = templateCard.cloneNode(true);
//   cardClone.querySelector('.popup__title').textContent = element.offer.title;

//   cardClone.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
//   cardClone.querySelector('.popup__type').textContent = element.offer.type;
//   cardClone.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
//   cardClone.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
//   /* удаляет дефолтные li */
//   var ListFeatures = cardClone.querySelector('.popup__features');
//   while (ListFeatures.firstChild) {
//     ListFeatures.removeChild(ListFeatures.firstChild);
//   }
//   cardClone.querySelector('.popup__features').appendChild(createFeaturesAsDOM(element));
//   cardClone.querySelector('.popup__description').textContent = element.offer.description;
//   /* удаляет дефолтные фото */
//   var ListPhotos = cardClone.querySelector('.popup__photos');
//   while (ListPhotos.firstChild) {
//     ListPhotos.removeChild(ListPhotos.firstChild);
//   }
//   /* вставляет фото как DOM-элемент в разметку */
//   cardClone.querySelector('.popup__photos').appendChild(createPhotosAsDom(element));
//   cardClone.querySelector('.popup__avatar').src = element.author.avatar;

//   fragmentCard.appendChild(cardClone);
//   wherePutCard.appendChild(fragmentCard);
// };

/* вызовы функций */

// for (var i = 0; i < AMOUNT; i++) {

//   createAndPutOnePin(i);
//   createCard(i);
// }


// for (var i = 0; i < AMOUNT; i++) {
//   pins[i] = createObject(i);
//   createAndPutOnePin(pins[i]);
//   createCard(pins[i]);
// }

/* module4-task1 */

/* module4-task1 */
var mainPin = document.querySelector('.map__pin--main');
var formAd = document.querySelector('.ad-form');
var childOfForm = document.querySelector('.ad-form').children;
// var selectInForm = document.querySelector('select');
var fieldsetInForm = document.querySelector('fieldset');
// var inputInForm = document.querySelector('input');
// var textareaInForm = document.querySelector('textarea');
// var buttonSubmit = document.querySelector('.ad-form__submit');
// var buttonReset = document.querySelector('.ad-form__reset');
var inputAddress = document.querySelector('#address');
var FIRST_COORDINATE = 570;
var SECOND_COORDINATE = 375;
var bodyRect = mainPin.getBoundingClientRect();
var mapImage = wherePutPin.getBoundingClientRect();
/* делает все инпуты, филдсеты, баттоны неактивными, делает неактивной карту */
// var makeDisabled = function () {
//   wherePutPin.classList.add('map--faded');
//   selectInForm.setAttribute('disabled', true);
//   fieldsetInForm.setAttribute('disabled', true);
//   inputInForm.setAttribute('disabled', true);
//   textareaInForm.setAttribute('disabled', true);
//   buttonSubmit.setAttribute('disabled', true);
//   buttonReset.setAttribute('disabled', true);
//   inputAddress.placeholder = FIRST_COORDINATE + ', ' + SECOND_COORDINATE;
// };


var makeDisabled = function () {
  wherePutPin.classList.add('map--faded');
  inputAddress.placeholder = FIRST_COORDINATE + ', ' + SECOND_COORDINATE;
  for (var i = 0; i <= childOfForm.length; i++) {
    fieldsetInForm.setAttribute('disabled', true);
  }
};

// document.addEventListener('DOMContentLoaded', makeDisabled);
makeDisabled();
/* вычисляет координату по оси Х для главного пина, адаптировано под расширение окна путем вычета координат карты */
var getCoordinateX = function () {
  var firstCoordinate = bodyRect.left - mapImage.left + window.scrollX;
  return firstCoordinate;
};
/* вычисляет координату по оси Y для главного пина*/
var getCoordinateY = function () {
  var secondCoordinate = bodyRect.top + window.scrollY;
  return secondCoordinate;
};
/* активация карты(убирается класс .map--faded) и делает все инпуты, филдсеты, баттоны активными.
Вычислет координаты главного пина,
создает пины объявлений */
// var makeActive = function () {
//   wherePutPin.classList.remove('map--faded');
//   formAd.classList.remove('ad-form--disabled');
//   selectInForm.removeAttribute('disabled');
//   fieldsetInForm.removeAttribute('disabled');
//   inputInForm.removeAttribute('disabled');
//   textareaInForm.removeAttribute('disabled');
//   buttonSubmit.removeAttribute('disabled');
//   buttonReset.removeAttribute('disabled');
//   inputAddress.placeholder = getCoordinateX() + ', ' + getCoordinateY();

//   for (var i = 0; i < AMOUNT; i++) {
//     pins[i] = createObject(i);
//     // createPhotosAsDom(createObject(i));
//     createAndPutOnePin(pins[i]);
//     // createCard(pins[i]);
//   }
// };
var makeActive = function () {
  wherePutPin.classList.remove('map--faded');
  formAd.classList.remove('ad-form--disabled');
  for (var j = 0; j <= childOfForm.length; j++) {
    fieldsetInForm.removeAttribute('disabled');
  }
  // childOfForm.removeAttribute('disabled');
  inputAddress.placeholder = getCoordinateX() + ', ' + getCoordinateY();

  for (var i = 0; i < AMOUNT; i++) {
    pins[i] = createObject(i);
    // createPhotosAsDom(createObject(i));
    createAndPutOnePin(pins[i]);
    // createCard(pins[i]);
  }
};

/* запускает функцию makeActive когда клавиша мышки отпущена*/
document.addEventListener('DOMContentLoaded', function () {
  mainPin.addEventListener('mouseup', makeActive);
});

/* --------------------------------module4-task2---------------------------- */


