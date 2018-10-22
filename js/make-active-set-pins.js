var mainPin = document.querySelector('.map__pin--main');
var formAd = document.querySelector('.ad-form');
var fieldsetInForm = formAd.querySelectorAll('fieldset');
var inputAddress = document.querySelector('#address');
// var FIRST_COORDINATE = 570;
// var SECOND_COORDINATE = 375;
// var bodyRect = mainPin.getBoundingClientRect();
// var mapImage = mapElement.getBoundingClientRect();
var mapElement = document.querySelector('.map');


/* активация карты(убирается класс .map--faded) и делает все инпуты, филдсеты, баттоны активными.
Вычислет координаты главного пина, создает пины объявлений */
var setUpAbleAndPin = function () {
  var makeActive = function () {
    /* удаляет disabled с карты и форм*/
    mapElement.classList.remove('map--faded');
    formAd.classList.remove('ad-form--disabled');
    fieldsetInForm.forEach(function (node) {
      node.removeAttribute('disabled');
    });
    inputAddress.value = getCoordinateX() + ', ' + getCoordinateY();

  };
  var foo = false;

  var makePins = function () {
    for (var i = 0; i < AMOUNT; i++) {
      pins[i] = createObject(i);
    }
  };

  var putPinsOnMap = function () {
    for (var i = 0; i < AMOUNT; i++) {
      createAndPutOnePin(pins[i]);
    }
  };

  var createAndPutPins = function () {
    makePins();
    putPinsOnMap();
    foo = true;
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mouseup', makeActive);
    document.removeEventListener('mouseup', createAndPutPins);
    document.removeEventListener('mouseup', onMouseUp);
    if (foo) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        mainPin.removeEventListener('click', onClickPreventDefault);
      };
      mainPin.addEventListener('click', onClickPreventDefault);
    }

  };
};

mainPin.addEventListener('mousedown', setUpAbleAndPin);
