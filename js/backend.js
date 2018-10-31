'use strict';
// backend.js — модуль, который работает с сервером

/* модуль, который будет загружать наши данные по сети load.js. */
(function () {

  window.backend = {};

  var URL = 'https://js.dump.academy/keksobooking/data';
  var xhr = new XMLHttpRequest(); // Это объект созданный функцией конструктором(всегда через new)
  // console.log(xhr);

  xhr.addEventListener('load', function () { // обработчик всегда раньше open и sent
    var elements = JSON.parse(xhr.responseText);
    for (var i = 0; i < elements.length; i++) {

      window.pin.putOnePin(elements[i]);
    }
    // console.log(xhr.status + ' ' + xhr.statusText);
  });


  xhr.open('GET', URL); //  куда пойдет запрос на сервер
  xhr.send(); // отправка запроса


})();
