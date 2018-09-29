'use strict';

var title = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

// var address = [
//   locationX(),
//   locationY()
// ];

var locationX = function () {
  var minX = 100;
  var maxX = 1087;

  return Math.floor(Math.random() * (maxX - minX)) + minX;
};

var locationY = function () {
  var minY = 130;
  var maxY = 630;

  return Math.floor(Math.random() * (maxY - minY)) + minY;
};

var price = function () {
  var min = 1000;
  var max = 1000000;

  return Math.floor(Math.random() * (max - min)) + min;
};

var typeMatch = ['palace', 'flat', 'house', 'bungalo'];

var type = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var getType = function () {
  var min = 1;
  var max = 5;
  var i = Math.floor(Math.random() * (max - min)) + min;
  var place = type[typeMatch[i - 1]];
  return place;
};

var rooms = function () {
  var min = 1;
  var max = 5;

  return Math.floor(Math.random() * (max - min)) + min;
};

var guests = function () {
  var guestNumber = Math.floor(Math.random() * 10);
  while (guestNumber === 0) {
    guestNumber = Math.random();
  }
  return guestNumber;
};

var checkin = ['12:00', '13:00', '14:00'];
var checkout = checkin;

var getTime1 = function () {
  var min = 1;
  var max = 3;
  var i = Math.floor(Math.random() * (max - min)) + min;
  var time = checkin[i - 1];
  return time;
};

var getTime2 = function () {
  var min = 1;
  var max = 3;
  var i = Math.floor(Math.random() * (max - min)) + min;
  var time = checkout[i - 1];
  return time;
};

// var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var description = '';

var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var wherePutPin = document.querySelector('.map');
var template = document.body.querySelector('#pin').content.querySelector('button');
var fragment = document.createDocumentFragment();

var pinHeight = 70;
var pinWidth = 50;

var putPin = function (number) {
  for (var i = 0; i < number.length; i++) {

    var element = template.cloneNode(true);

    element.style.left = (locationX() - pinWidth) + 'px';
    element.style.top = (locationY() - pinHeight) + 'px';

    element.querySelector('img').src = 'img/avatars/user0' + (i + 1) + '.png';

    element.querySelector('img').alt = title[i];
    fragment.appendChild(element);
    wherePutPin.appendChild(fragment);
  }

};

// var body = document.querySelector('body');
var wherePutCard = document.querySelector('.map__filters-container');
var templateCard = document.body.querySelector('#card').content.querySelector('.map__card');
var fragmentCard = document.createDocumentFragment();
// var photosCard = templateCard.querySelector('.popup__photos');
// var featuresTemplate = templateCard.querySelector('.popup__features');


/*

<ul class="popup__features">
        <li class="popup__feature popup__feature--wifi"></li>
        <li class="popup__feature popup__feature--dishwasher"></li>
        <li class="popup__feature popup__feature--parking"></li>
        <li class="popup__feature popup__feature--washer"></li>
        <li class="popup__feature popup__feature--elevator"></li>
        <li class="popup__feature popup__feature--conditioner"></li>
      </ul>*/

// var getFeatures = function () {
//   var ranNumber = getRandom(1, 7);
//   var featuresUl = templateCard.querySelector('.popup__features');
//   var featuresLi = featuresUl.cloneNode(true);
//   console.log(featuresLi);

//   // for(var i = 0; i < ranNumber; i++ ){


//   //   //var featuresLi = featuresUl.appendChild(featuresLi[i]);
//   // }


//   return featuresList;
// };

var createCard = function (number) {
  for (var i = 0; i < number.length; i++) {
    var element = templateCard.cloneNode(true);
    element.querySelector('.popup__title').textContent = title[i];
    element.querySelector('.popup__text--price').textContent = price() + '₽/ночь';
    element.querySelector('.popup__type').textContent = getType();
    element.querySelector('.popup__text--capacity').textContent = rooms() + ' комнаты для ' + guests() + ' гостей';
    element.querySelector('.popup__text--time').textContent = 'Заезд после ' + getTime1() + ', выезд до ' + getTime2();
    // element.querySelector('.popup__features').textContent = getFeatures();

  //   element.querySelector('.popup__description').textContent = description;
  //   for (var j = 0; j <= photos.length; j++) {
  //     photosCard.querySelector('img').src = photos[j];
  //   }
  //   fragmentCard.appendChild(element);
  //   wherePutCard.appendChild(fragmentCard);
  // }

};

putPin([1, 1, 1, 1, 1, 1, 1, 1]);
createCard([1, 1, 1, 1, 1, 1, 1, 1]);
