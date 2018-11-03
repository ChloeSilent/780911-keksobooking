'use strict';
// backend.js — модуль, который работает с сервером

/* модуль, который будет загружать наши данные по сети load.js. */
(function () {

  window.backend = {};
  var URL = {
    'SEND': 'https://js.dump.academy/keksobooking',
    'GET': 'https://js.dump.academy/keksobooking/data'
  };
  var TIME_OUT = 10000;
  window.backend.loadData = function (onLoadData) {
    xhrSend(URL['GET'], 'GET', onLoadData);
  };

  window.backend.upload = function (data, onSuccess) {
    xhrSend(URL['SEND'], 'POST', onSuccess, data);
  };

  var mainElement = document.querySelector('main');
  var fragment = document.createDocumentFragment();

  /* блок с сообщениями на успшную/неуспешную ситуацию при получении/отправке данных */
  window.backend.onSuccessUpLoad = function () {

    var templateSuccessMessageElement = document.querySelector('#success').content.querySelector('.success');
    var successMessageClone = templateSuccessMessageElement.cloneNode(true);

    fragment.appendChild(successMessageClone);
    mainElement.appendChild(fragment);

    var ECS_INPUT = 27;
    var removeSuccesMessage = function () {
      successMessageClone.remove();
    };
    var onSuccesssEscDown = function (evt) {
      if (successMessageClone && evt.keyCode === ECS_INPUT) {
        successMessageClone.remove();
      }
    };

    document.addEventListener('keydown', onSuccesssEscDown);
    templateSuccessMessageElement.addEventListener('click', removeSuccesMessage);

  };


  var onError = function (errorMessage) {

    var templateErrorMessageElement = document.querySelector('#error').content.querySelector('.error');
    var errorMessageClone = templateErrorMessageElement.cloneNode(true);
    fragment.appendChild(errorMessageClone);
    mainElement.appendChild(fragment);
    errorMessageClone.querySelector('.error__message').textContent = errorMessage;
    var messageCloseElement = errorMessageClone.querySelector('.error__button');


    var ECS_INPUT = 27;
    var removeErrorMessage = function () {
      errorMessageClone.remove();
    };

    var onErrorEscDown = function (evt) {
      if (errorMessageClone && evt.keyCode === ECS_INPUT) {
        errorMessageClone.remove();
      }
    };

    messageCloseElement.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', onErrorEscDown);
    templateErrorMessageElement.addEventListener('click', removeErrorMessage);
  };


  var xhrSend = function (url, method, onSuccess, data) {
    var xhr = new XMLHttpRequest();

    xhr.timeout = TIME_OUT; // 10s
    xhr.responseType = 'json';

    var onTimeOutData = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    var onErrorData = function () {
      onError('Произошла ошибка соединения');
    };

    xhr.addEventListener('error', onErrorData);
    xhr.addEventListener('timeout', onTimeOutData);

    var onLoad = function () {

      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }

    };

    xhr.addEventListener('load', onLoad);
    xhr.open(method, url);
    xhr.send(method === 'POST' ? data : undefined);

  };

})();
