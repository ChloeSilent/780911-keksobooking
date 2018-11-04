'use strict';
// card.js — модуль, который отвечает за создание карточки объявлений и отрисовку ее на карте;


(function () {

  var PHOTO_PLACE_WIDTH = 45;
  var PHOTO_PLACE_HEIGHT = 45;
  var ECS_INPUT = 27;
  window.card.mapFiltersContainerElement = document.querySelector('.map__filters-container');
  var templateCardElement = document.querySelector('#card').content.querySelector('.map__card');

  /* создает новые li на основе массива features у элемента*/
  var createFeatures = function (pin) {
    var fragmentLi = document.createDocumentFragment();

    pin.offer.features.forEach(function (feature) {
      var newLi = document.createElement('li');
      newLi.className = 'popup__feature popup__feature--' + feature;
      fragmentLi.appendChild(newLi);
    });
    return fragmentLi;
  };

  /* создает новые фото на основе массива photos у элемента*/
  var createPhotos = function (pin) {
    var fragmentPhotos = document.createDocumentFragment();
    pin.offer.photos.forEach(function (photo) {
      var newPhoto = document.createElement('img');
      newPhoto.src = photo;
      newPhoto.className = 'popup__photo';
      newPhoto.alt = 'Фотография жилья';
      newPhoto.width = PHOTO_PLACE_WIDTH;
      newPhoto.height = PHOTO_PLACE_HEIGHT;
      fragmentPhotos.appendChild(newPhoto);
    });
    return fragmentPhotos;
  };

  /* удаляет дочерние ноды, пока они есть */
  var removeChildrenNodes = function (list) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  };

  /* создает карточку как DOM-элемент */
  var createCard = function (pin) {
    var cardClone = templateCardElement.cloneNode(true);
    cardClone.querySelector('.popup__title').textContent = pin.offer.title;
    cardClone.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    cardClone.querySelector('.popup__type').textContent = pin.offer.type;
    cardClone.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    cardClone.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkin;

    /* удаляет дефолтные li */
    var listFeaturesElement = cardClone.querySelector('.popup__features');
    removeChildrenNodes(listFeaturesElement);

    cardClone.querySelector('.popup__features').appendChild(createFeatures(pin));
    cardClone.querySelector('.popup__description').textContent = pin.offer.description;

    /* удаляет дефолтные фото */
    var listPhotosElement = cardClone.querySelector('.popup__photos');

    removeChildrenNodes(listPhotosElement);

    /* вставляет фото как DOM-элемент в разметку */
    cardClone.querySelector('.popup__photos').appendChild(createPhotos(pin));
    cardClone.querySelector('.popup__avatar').src = pin.author.avatar;
    var cardCloseElement = cardClone.querySelector('.popup__close');
    var onErrorEscDown = function (evt) {
      if (cardClone && evt.keyCode === ECS_INPUT) {
        cardClone.remove();
      }
    };
    document.addEventListener('keydown', onErrorEscDown);
    cardCloseElement.addEventListener('click', function () {
      cardClone.remove();

    });

    return cardClone;
  };

  /* отрисовка одной карточки*/
  window.card.drawOneCard = function (pin) {
    var fragmentCard = document.createDocumentFragment();
    fragmentCard.appendChild(createCard(pin));
    window.card.mapFiltersContainerElement.appendChild(fragmentCard);

  };

})();
