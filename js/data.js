'use strict';
// data.js — модуль, который создаёт объект(для пина и карточки);

// TODO: delete unuseble code
(function () {

  window.data = {};

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

  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var PHOTOS_AMOUNT = 3;
  var PHOTO_SOURCE = 'http://o0.github.io/assets/images/tokyo/hotel';
  var JPG = '.jpg';

  var MIN_X = 100;
  var MAX_X = 1087;

  var MIN_Y = 130;
  var MAX_Y = 630;


  /* Возвращает рандомное число между мин и макс */
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /* перемешивает массив рандомно*/
  window.data.shuffle = function (array) {

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
  var getRandomFromArray = function (array) {
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

    var list = window.data.shuffle(array);
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
  window.data.createObject = function (i) {

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
        'checkin': getRandomFromArray(CHECKIN),
        'checkout': '',
        'features': createNewArrayfromExistOne(FEATURES),
        'description': '',
        'photos': window.data.shuffle(createdPhotosArray)
      },

      'location': {
        'x': getRandom(MIN_X, MAX_X),
        'y': getRandom(MIN_Y, MAX_Y)
      }
    };
    return element;
  };


})();
