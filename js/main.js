'use strict';
(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var pageActivated = false;

  var onMainButtonMouseDown = function (downEvt) {
    downEvt.preventDefault();

    if (downEvt.button === window.utils.keyCode.MOUSE_MAIN) {
      if (!window.main.pageActivated) {
        window.map.activate();
        window.pin.render(window.offers);
        window.form.activate();
        window.main.pageActivated = true;
        mainPin.removeEventListener('keydown', onEnterKeyDown);
      }

      window.dragndrop.activate(downEvt);
    }
  };

  var onEnterKeyDown = function (evt) {
    if (evt.keyCode === window.utils.keyCode.ENTER) {
      window.map.activate();
      window.form.activate();
      window.form.fillAddressInput();
    }
  };

  var onSuccess = function (data) {
    window.offers = data;
    mainPin.addEventListener('mousedown', onMainButtonMouseDown);
    mainPin.addEventListener('keydown', onEnterKeyDown);
  };

  // var onErrorButtonClick = function (evt) {
  //   if (evt.button === window.utils.keyCode.MOUSE_MAIN) {
  //     var errorButton = document.querySelector('.error__button');
  //     errorButton.removeEventListener('click', onErrorButtonClick);
  //     window.message.close();
  //   }
  // };

  var onMainButtonClick = function (evt) {
    if (evt.button === window.utils.keyCode.MOUSE_MAIN) {
      window.message.close();
      document.removeEventListener('click', onMainButtonClick);
    }
  };

  var onEscapeKeyDown = function (evt) {
    if (evt.keyCode === window.utils.keyCode.ESCAPE) {
      window.message.close();
      document.removeEventListener('keydown', onEscapeKeyDown);
    }
  };

  var onError = function (errorText, status) {
    window.message.show(errorText, status);
    document.addEventListener('click', onMainButtonClick);
    document.addEventListener('keydown', onEscapeKeyDown);
  };

  window.backend.load(window.backend.serverUrl.GET, onSuccess, onError);
  window.form.fillAddressInput();
  window.form.disable();

  window.main = {
    pageActivated: pageActivated,
    onMainButtonClick: onMainButtonClick,
    onEscapeKeyDown: onEscapeKeyDown
  };

})();
