'use strict';

(function () {
  var ServerUrl = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };

  var TIMEOUT_IN_MS = 5000;

  var ServerStatus = {
    OK: 200
  };

  var save = function (url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    var onXhrLoad = function () {
      if (xhr.status === ServerStatus.OK) {
        onLoad(xhr.response);
      } else {
        onError(window.message.atLoad(xhr), 'error');
      }
    };

    var onXhrError = function () {
      onError(window.message.Text.ERROR, 'error');
    };

    var onXhrTimeout = function () {
      onError(window.message.atTimeout(xhr), 'error');
    };

    xhr.addEventListener('load', onXhrLoad);
    xhr.addEventListener('error', onXhrError);
    xhr.addEventListener('timeout', onXhrTimeout);

    xhr.open('POST', ServerUrl.POST);
    xhr.send(data);
  };

  var load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    var onXhrLoad = function () {
      if (xhr.status === ServerStatus.OK) {
        onLoad(xhr.response);
      } else {
        onError(window.message.atLoad(xhr), 'error');
      }
    };

    var onXhrError = function () {
      onError(window.message.Text.ERROR, 'error');
    };

    var onXhrTimeout = function () {
      onError(window.message.atTimeout(xhr), 'error');
    };

    xhr.addEventListener('load', onXhrLoad);
    xhr.addEventListener('error', onXhrError);
    xhr.addEventListener('timeout', onXhrTimeout);

    xhr.open('GET', url);
    xhr.send();
  };

  window.backend = {
    ServerUrl: ServerUrl,
    save: save,
    load: load
  };
})();
