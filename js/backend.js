'use strict';
// backend.js — модуль, который работает с сервером

/* модуль, который будет загружать наши данные по сети load.js. */
(function () {

  window.backend = {};

  window.backend.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    window.backend.dataload = function () {

      window.backend.URL = 'https://js.dump.academy/keksobooking/data';
      xhr.timeout = 1000;
      xhr.responseType = 'json';

      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };

    var errorLoadData = function () {
      onError('Произошла ошибка соединения');
    };

    var timeoutLoadData = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    xhr.addEventListener('load', window.backend.dataload);
    xhr.addEventListener('error', errorLoadData);
    xhr.addEventListener('timeout', timeoutLoadData);

    xhr.open('GET', window.backend.URL);
    xhr.send();
  };


})();
