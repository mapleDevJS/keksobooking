'use strict';

(function () {
  var SERVER_URL = {
    GET: 'https://js.dump.academy/keksobooking/data',
    PUSH: 'https://js.dump.academy/keksobooking'
  };

  var TIMEOUT_IN_MS = 1;

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
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', url);
    xhr.send(data);
  };

  var load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === serverStatus.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', url);
    xhr.send();
  };

  window.backend = {
    SERVER_URL: SERVER_URL,
    save: save,
    load: load
  };
})();
