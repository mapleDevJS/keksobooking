'use strict';

(function () {
  var main = document.querySelector('main');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorTemplate.cloneNode(true);
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessage = successTemplate.cloneNode(true);

  var show = function (message, status) {
    switch (status) {
      case 'error':
        errorMessage.querySelector('.error__message').textContent = message;
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

      document.removeEventListener('keydown', close);
      document.removeEventListener('click', close);
    }
  };

  window.message = {
    show: show,
    close: close
  };
})();
