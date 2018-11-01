'use strict';
// card.js — модуль, который отвечает за создание карточки объявлений и отрисовку ее на карте;


(function () {

  var FEATURE_STYLE = 'popup__feature popup__feature--';
  var PHOTO_PLACE_WIDTH = 45;
  var PHOTO_PLACE_HEIGHT = 45;

  window.card.mapFiltersContainerElement = document.querySelector('.map__filters-container');
  var templateCardElement = document.querySelector('#card').content.querySelector('.map__card');

  /* создает новые li на основе массива features у элемента*/
  var createFeaturesAsDOM = function (element) {
    var fragmentLi = document.createDocumentFragment();

    element.offer.features.forEach(function (feature) {
      var newLi = document.createElement('li');
      newLi.className = FEATURE_STYLE + feature;
      fragmentLi.appendChild(newLi);
    });
    // for (var k = 0; k < element.offer.features.length; k++) {
    //   var newLi = document.createElement('li');
    //   newLi.className = FEATURE_STYLE + element.offer.features[k];
    //   fragmentLi.appendChild(newLi);
    // }
    return fragmentLi;
  };

  /* создает новые фото на основе массива photos у элемента*/
  var createFeaturesElements = function (element) {
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
  /* удаляет дочерние ноды, пока они есть */
  // var removeChildrenNodes = function (list) {
  //   list.removeChild(list.firstChild);
  // };
  /* эта виснет после клика по кл пину*/
  // var removeChildrenNodes = function (list) {
  //   var i = list.length;
  //   while (i--) {
  //     list[i].parentNode.removeChild(list[i]);
  //   }
  // };
  /* эта виснет после клика по кл пину*/
  var removeChildrenNodes = function (list) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
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
      removeChildrenNodes(ListFeaturesElement);
    }

    cardClone.querySelector('.popup__features').appendChild(createFeaturesAsDOM(element));
    cardClone.querySelector('.popup__description').textContent = element.offer.description;

    /* удаляет дефолтные фото */
    var ListPhotosElement = cardClone.querySelector('.popup__photos');
    while (ListPhotosElement.firstChild) {
      removeChildrenNodes(ListPhotosElement);
    }
    /* вставляет фото как DOM-элемент в разметку */
    cardClone.querySelector('.popup__photos').appendChild(createFeaturesElements(element));
    cardClone.querySelector('.popup__avatar').src = element.author.avatar;
    var cardCloseElement = cardClone.querySelector('.popup__close');
    // работающа функция
    // cardCloseElement.addEventListener('click', function (evt) {
    //   var target = evt.target;
    //   target.parentNode.remove();
    // функция переделана по комменту(хз работает ли)
    cardCloseElement.addEventListener('click', function () {
      cardClone.remove();

    });

    return cardClone;
  };

  /* отрисовка одной карточки*/
  window.card.drawOneCard = function (element) {
    var fragmentCard = document.createDocumentFragment();
    fragmentCard.appendChild(createCard(element));
    window.card.mapFiltersContainerElement.appendChild(fragmentCard);

  };


})();
