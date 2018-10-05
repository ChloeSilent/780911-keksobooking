/* eslint-disable eqeqeq */
'use strict';

/* КОНСТАНТЫ*/

var AMOUNT = 8;
var TYPE = ['palace', 'flat', 'house', 'bungalo'];

var TYPEMATCH = {
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

var AVATARSOURCE = 'img/avatars/user0';
var PNG = '.png';


var MINPRICE = 1000;
var MAXPRICE = 1000000;

var MINAMOUTOFROOMS = 1;
var MAXAMOUTOFROOMS = 5;

var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = CHECKIN;

var FEATURES = ['--wifi', '--dishwasher', '--parking', '--washer', '--elevator', '--conditioner'];
var FEATURESTYLE = 'popup__feature popup__feature';

var PHOTOSOURCE = 'http://o0.github.io/assets/images/tokyo/hotel';
var JPG = '.jpg';
var PHOTOPLACEWIDTH = 45;
var PHOTOPLACEHEIGHT = 45;

var MINX = 100;
var MAXX = 1087;

var MINY = 130;
var MAXY = 630;

var PINHEIGHT = 70;
var PINWIDTH = 50;
var PX = 'px';

/* ПЕРЕМЕННЫЕ*/
var newArray = [];
newArray.length = AMOUNT;

/* переменные пина*/
var wherePutPin = document.querySelector('.map');
var templatePin = document.body.querySelector('#pin');
var pin = templatePin.content.querySelector('button');
var fragment = document.createDocumentFragment();
// var newArray = Array(AMOUNT);
/* переменные карточки*/
var wherePutCard = document.querySelector('.map__filters-container');
var templateCard = document.body.querySelector('#card').content.querySelector('.map__card');
var fragmentCard = document.createDocumentFragment();

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
var createImageSource = function (i, adress, formatEnd) {
  return adress + i + formatEnd;
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
var createPhotosArray = function () {
  var photosArray = [];
  for (var i = 1; i <= 3; i++) {
    photosArray[i - 1] = PHOTOSOURCE + i + JPG; // минус единица в индексе элемента массива дана, тк в массиве отсчет с 0, а i в цикле начинается с 1
  }
  return shuffle(photosArray);
};

/* функция создающая элемент-массив. На вход принимает цифру, которая указывает кол-во создх впоследствии эл-в*/
var createObject = function (i) {
  var element = {
    'author': {
      'avatar': createImageSource(i, AVATARSOURCE, PNG)
    },

    'offer': {
      'title': TITLE[i - 1],
      'address': '',
      'price': getRandom(MINPRICE, MAXPRICE),
      'type': TYPEMATCH[TYPE[getRandom(0, TYPE.length)]],
      'rooms': getRandom(MINAMOUTOFROOMS, MAXAMOUTOFROOMS),
      'guests': getRandom(1, Math.floor(Math.random() * 10)), // возвращает радномно число из из функции getRandom от 1 до любого округленного радомного
      'checkin': getFromArray(CHECKIN),
      'checkout': getFromArray(CHECKOUT),
      'features': createNewArrayfromExistOne(FEATURES),
      'description': '',
      'photos': createPhotosArray()
    },

    'location': {
      'x': getRandom(MINX, MAXX),
      'y': getRandom(MINY, MAXY)
    }
  };
  return element;
};


/* создает один пин как элемент DOM и помещает его на карту */
var createAndPutOnePin = function () {
  var element = createObject(i);
  var pinClone = pin.cloneNode(true);

  pinClone.style.left = element.location.x - PINWIDTH + PX;
  pinClone.style.top = element.location.y - PINHEIGHT + PX;
  pinClone.querySelector('img').src = element.author.avatar;
  pinClone.querySelector('img').alt = element.offer.avatar;

  fragment.appendChild(pinClone);
  wherePutPin.appendChild(fragment);
};

/* создает карточку как DOM-элемент */
var createCard = function () {
  var element = createObject(i);
  var cardClone = templateCard.cloneNode(true);
  cardClone.querySelector('.popup__title').textContent = element.offer.title;

  cardClone.querySelector('.popup__text--price').textContent = element.offer.price + '₽/ночь';
  cardClone.querySelector('.popup__type').textContent = element.offer.type;
  cardClone.querySelector('.popup__text--capacity').textContent = element.offer.rooms + ' комнаты для ' + element.offer.guests + ' гостей';
  cardClone.querySelector('.popup__text--time').textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
  /* блок создания features в карточке */
  /* удаляет дефолтные li */
  var ListFeatures = cardClone.querySelector('.popup__features');
  while (ListFeatures.firstChild) {
    ListFeatures.removeChild(ListFeatures.firstChild);
  }
  /* создает новые li на основе массива features у элемента*/
  var fragmentLi = document.createDocumentFragment();
  for (var k = 1; k <= element.offer.features.length; k++) { // Я добавила сюда отсчет k от 0 и возрастание до =!!!!!!!!
    var newLi = document.createElement('li');
    newLi.className = FEATURESTYLE + element.offer.features[k - 1];
    fragmentLi.appendChild(newLi);
  }
  cardClone.querySelector('.popup__features').appendChild(fragmentLi);
  cardClone.querySelector('.popup__description').textContent = element.offer.description;
  /* блок создания фотографий в карточке */
  /* удаляет дефолтные фото */
  var ListPhotos = cardClone.querySelector('.popup__photos');
  while (ListPhotos.firstChild) {
    ListPhotos.removeChild(ListPhotos.firstChild);
  }
  /* создает новые фото на основе массива photos у элемента*/
  var fragmentPhotos = document.createDocumentFragment();
  for (var m = 1; m <= element.offer.photos.length; m++) {
    var newPhoto = document.createElement('img');
    newPhoto.src = element.offer.photos[m - 1];
    newPhoto.className = 'popup__photo';
    newPhoto.alt = 'Фотография жилья';
    newPhoto.width = PHOTOPLACEWIDTH;
    newPhoto.height = PHOTOPLACEHEIGHT;
    fragmentPhotos.appendChild(newPhoto);
  }
  /* вставляет фото как DOM-элемент в разметку */
  cardClone.querySelector('.popup__photos').appendChild(fragmentPhotos);
  cardClone.querySelector('.popup__avatar').src = element.author.avatar;

  fragmentCard.appendChild(cardClone);
  wherePutCard.appendChild(fragmentCard);
};

/* вызовы функций */
for (var i = 1; i <= AMOUNT; i++) {
  newArray[i] = createObject(i);
  createAndPutOnePin(i);
  createCard(newArray[i]);
}

