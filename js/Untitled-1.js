/* eslint-disable eqeqeq */
'use strict';
/* КОНСТАНТЫ*/
var TITLE = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var PINHEIGHT = 70;
var PINWIDTH = 50;

var DESCRIPTION = ' ';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];

var TYPEMATCH = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = CHECKIN;

var MINX = 100;
var MAXX = 1087;

var MINY = 130;
var MAXY = 630;

var MINPRICE = 1000;
var MAXPRICE = 1000000;

var MINAMOUTOFROOMS = 1;
var MAXAMOUTOFROOMS = 5;

var PX = 'px';
var SRCEXAMPLE = 'img/avatars/user0';
var PNG = '.png';

/* ПЕРЕМЕННЫЕ*/

/* переменные пина*/
var wherePutPin = document.querySelector('.map');
var templatePin = document.body.querySelector('#pin');
var pin = templatePin.content.querySelector('button');
var fragment = document.createDocumentFragment();

/* переменные карточки*/
var wherePutCard = document.querySelector('.map__filters-container');
var templateCard = document.body.querySelector('#card').content.querySelector('.map__card');
var fragmentCard = document.createDocumentFragment();
var featuresUl = templateCard.querySelector('ul');
var featuresLi = featuresUl.querySelectorAll('.popup__feature');


/* ФУНКЦИИ */
/* Возвращает рандомное число между мин и макс */
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
/* Возвращает рандомное title из массива TITLE */
var getTitle = function () {

  var number = getRandom(0, TITLE.length);
  return TITLE[number];
};

/* Возвращает положение пина на оси Х(горизонталь) на карте */
var locationX = function () {
  return getRandom(MINX, MAXX);
};

/* Возвращает положение пина на оси Y(вертикаль) на карте */
var locationY = function () {
  return getRandom(MINY, MAXY);
};

/* Возвращает рандомно цену для предложения */
var price = function () {
  var Price = getRandom(MINPRICE, MAXPRICE);
  return Price;
};

/* Возвращает рандомно тип жилья, на основе массива с типами жилья и его словарем(объект)  */
var getType = function () {
  var i = getRandom(0, TYPE.length);
  return TYPEMATCH[TYPE[i]];
};

/* Возвращает рандомно количество комнат */
var rooms = function () {
  return getRandom(MINAMOUTOFROOMS, MAXAMOUTOFROOMS);
};

/* Возвращает рандомно количество гостей, если их 0, функция повторяется, пока не веренет число отличное от 0 */
var guests = function () {
  var guestNumber = Math.floor(Math.random() * 10);
  while (guestNumber === 0) {
    guestNumber = Math.random();
  }
  return guestNumber;
};
/* возвращает рандомно время */
var getTime1 = function () {
  var i = getRandom(0, CHECKIN.length);
  return CHECKIN[i];
};

var getTime2 = function () {
  var i = getRandom(0, CHECKOUT.length);
  return CHECKOUT[i];
};

// var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
// ];

/* ставит пин на карту, меняет адрес внутри тега img внутри пина, добавляет атрибут alt для тега img*/

var putPin = function (number) {
  for (var i = 0; i < number.length; i++) {

    var pinClone = pin.cloneNode(true);

    pinClone.style.left = (locationX() - PINWIDTH) + PX;
    pinClone.style.top = (locationY() - PINHEIGHT) + PX;

    pinClone.querySelector('img').src = SRCEXAMPLE + (i + 1) + PNG;

    pinClone.querySelector('img').alt = TITLE[i];
    fragment.appendChild(pinClone);
    wherePutPin.appendChild(fragment);
  }

};

// /* перемешивает массив рандомно*/
// var shuffle = function (featuresArray) {
//   var j;
//   var x;
//   for (var i = featuresArray.length - 1; i > 0; i--) {
//     j = Math.floor(Math.random() * (i + 1));
//     x = featuresArray[i];
//     featuresArray[i] = featuresArray[j];
//     featuresArray[j] = x;
//   }
//   console.log('featuresArray is ');
//   console.log(featuresArray);
//   return featuresArray;
// };


// /* создает новый массив */
// var getFeaturesList = function (list) {
//   var popupFeauturesList = [];
//   shuffle(list);
//   var number = getRandom(0, list.length);
//   console.log('number = ' + number)
//   for (var i = 0; i <= number; i++) {
//     popupFeauturesList[i] = featuresLi[i];
//     console.log('popupFeauturesList is ');
//     console.log(popupFeauturesList);
//   }
//   return popupFeauturesList;
// };
// /* создает из массива элементы разметки*/
// var createHTMLfromArray = function (list) {
//   var featuresArray = getFeaturesList(list);
//   var fragmentUL = document.createDocumentFragment();
//   for (var i = 0; i < featuresArray.length; i++) {
//     fragmentUL.appendChild(featuresArray[i]);
//   }
//   console.log('fragmentUL is ');
//   console.log(fragmentUL);
//   return fragmentUL;
// };
var features = ['--wifi', '--dishwasher', '--parking', '--washer', '--elevator', '--conditioner'];
var featureStyle = 'popup__feature popup__feature';

/* перемешивает массив рандомно*/
var shuffle = function () {
  var featuresArray = features;
  var j;
  var x;
  for (var i = featuresArray.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = featuresArray[i];
    featuresArray[i] = featuresArray[j];
    featuresArray[j] = x;
  }
  // console.log('featuresArray is ');
  // console.log(featuresArray);
  return featuresArray;
};
// shuffle();
// shuffle();

/* создает новый массив */
var getFeaturesList = function () {
  var popupFeauturesList = [];
  var list = shuffle();
  var number = getRandom(0, list.length);
  // console.log('number = ' + number);
  for (var i = 0; i <= number; i++) {
    popupFeauturesList[i] = list[i];
    // console.log('popupFeauturesList is ');
    // console.log(popupFeauturesList);
  }
  return popupFeauturesList;
};

// getFeaturesList();

/* создает из массива элементы разметки*/

var createHTMLfromArray = function (list) {
  var featuresArray = getFeaturesList(list);
  // var fragment = document.createDocumentFragment();
  for (var i = 0; i < featuresArray.length; i++) {
    var newElement = document.createElement('li');
    newElement.className = featureStyle + featuresArray[i];
    fragment.appendChild(newElement);
  }
  // console.log('fragmentUL is ');
  // console.log(fragmentUL);
  return fragment;
};

var createCard = function (number) {
  for (var i = 0; i < number.length; i++) {
    var element = templateCard.cloneNode(true);
    element.querySelector('.popup__title').textContent = getTitle();

    element.querySelector('.popup__text--price').textContent = price() + '₽/ночь';
    element.querySelector('.popup__type').textContent = getType();
    element.querySelector('.popup__text--capacity').textContent = rooms() + ' комнаты для ' + guests() + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + getTime1() + ', выезд до ' + getTime2();
    // element.querySelector('.popup__features').innerHTML = createHTMLfromArray();
    element.querySelector('.popup__features').appendChild(createHTMLfromArray());
    element.querySelector('.popup__description').textContent = DESCRIPTION;
    // for (var j = 0; j <= photos.length; j++) {
    //   photos__card.querySelector('img').src = photos[j];
    // }
    fragmentCard.appendChild(element);
    wherePutCard.appendChild(fragmentCard);
  }

};

// var arrayTest = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// var getFeaturesList = function () {
//   var popupFeauturesList = [];
//   shuffle(arrayTest);
//   var number = getRandom(0, arrayTest.length);
//   //console.log('number = ' + number)
//   if (number !== 0) {
//     for (var i = 0; i < number; i++) {
//       popupFeauturesList[i] = arrayTest[i];
//       console.log(popupFeauturesList[i]);
//     }
//   } else {
//     //console.log('number = 0!!!')
//   }
// };

// getFeaturesList();


putPin([1, 1, 1, 1, 1, 1, 1, 1]);
createCard([1, 1, 1, 1, 1, 1, 1]);
// shuffle(featuresLi);
