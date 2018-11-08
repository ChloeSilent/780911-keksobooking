'use strict';
// debounce.js — модуль, который делает debounce;


(function () {

  var DEBOUNCE_INTERVAL = 500; // ms

  window.debounce = {};

  var lastTimeout;
  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

})();
