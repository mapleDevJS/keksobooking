'use strict';

(function () {
  var Text = {
    ERROR: 'Проверьте подключение к интернету',
    RESPONSE: 'Статус ответа: ',
    TIMEOUT: 'Превышено время ожидания данных '
  };

  var Time = {
    SI: 'мс'
  };

  var main = document.querySelector('main');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorTemplate.cloneNode(true);
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessage = successTemplate.cloneNode(true);

  var show = function (textMessage, status) {
    switch (status) {
      case 'error':
        errorMessage.querySelector('.error__message').textContent = textMessage;
        main.appendChild(errorMessage);
        break;
      case 'success':
        document.body.appendChild(successMessage);
        break;
    }
  };

  var close = function () {
    if (errorMessage) {
      errorMessage.remove();
    }

    if (successMessage) {
      successMessage.remove();
    }
  };

  var atLoad = function (request) {
    return Text.RESPONSE + request.status + ' ' + request.statusText;
  };

  var atTimeout = function (request) {
    return Text.TIMEOUT + request.timeout + Time.SI;
  };

  window.message = {
    Text: Text,
    show: show,
    close: close,
    atLoad: atLoad,
    atTimeout: atTimeout
  };
})();
