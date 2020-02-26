'use strict';

(function () {
  var text = {
    ERROR: 'Произошла ошибка соединения',
    RESPONSE: 'Статус ответа: ',
    TIMEOUT: 'Превышено время ожидания данных '
  };

  var time = {
    si: 'мс'
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

  var close = function (evt) {
    if (evt.button === window.utils.key.MOUSE_MAIN || evt.key === window.utils.key.ESCAPE) {
      if (errorMessage) {
        errorMessage.remove();
      }

      if (successMessage) {
        successMessage.remove();
      }
    }
  };

  var atLoad = function (request) {
    return text.RESPONSE + request.status + ' ' + request.statusText;
  };

  var atTimeout = function (request) {
    return text.TIMEOUT + request.timeout + time.si;
  };

  window.message = {
    text: text,
    show: show,
    close: close,
    atLoad: atLoad,
    atTimeout: atTimeout
  };
})();
