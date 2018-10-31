'use strict';
// backend.js — модуль, который работает с сервером

/* модуль, который будет загружать наши данные по сети load.js. */
(function () {

  window.backend = {};

  window.backend.loadData = function (onLoadData) {


    xhrSend('https://js.dump.academy/keksobooking/data', 'GET', onLoadData);

  };

  var xhrSend = function (url, method, onSuccess) {
    var xhr = new XMLHttpRequest(); // Это объект созданный функцией конструктором(всегда через new)


    var onLoad = function () {

      // обработчик всегда раньше open и sent

      onSuccess(xhr.response);

    };


    xhr.addEventListener('load', onLoad);

    xhr.responseType = 'json';
    xhr.open(method, url); //  куда пойдет запрос на сервер
    xhr.send(); // отправка запроса
  };


  // window.backend.loadData();

})();
