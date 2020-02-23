'use strict';

(function () {
  var serverUrl = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };

  var TIMEOUT_IN_MS = 5000;

  var serverStatus = {
    OK: 200
  };

  var save = function (url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === serverStatus.OK) {
        onLoad(xhr.response);
      } else {
        var message = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
        onError(message, 'error');
      }
    });

    xhr.open('POST', serverUrl.POST);
    xhr.send(data);
  };

  var load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {

      if (xhr.status === serverStatus.OK) {
        onLoad(xhr.response);
      } else {
        onError(('Статус ответа: ' + xhr.status + ' ' + xhr.statusText), 'error');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения', 'error');
    });
    xhr.addEventListener('timeout', function () {
      onError(('Запрос не успел выполниться за ' + xhr.timeout + 'мс'), 'error');
    });

    xhr.open('GET', url);
    xhr.send();
  };

  window.backend = {
    serverUrl: serverUrl,
    save: save,
    load: load
  };
})();
