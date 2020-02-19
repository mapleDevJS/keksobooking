'use strict';

(function () {
  var main = document.querySelector('main');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorTemplate.cloneNode(true);
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessage = successTemplate.cloneNode(true);

  var show = function (result) {
    switch (result) {
      case 'error':
        main.appendChild(errorMessage);
        break;
      case 'success':
        document.body.appendChild(successMessage);
        break;
    }
  };

  var close = function (evt) {
    if (evt.button === window.utils.KEY.MOUSE_LEFT || evt.key === window.utils.KEY.ESCAPE) {
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
