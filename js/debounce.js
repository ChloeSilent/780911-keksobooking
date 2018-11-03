'use strict';
// debounce.js — модуль, который делает debounce;


(function () {

  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout;
  window.debounce.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

})();
